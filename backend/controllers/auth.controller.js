import bcrypt from "bcryptjs";
import { userModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { RES } from "../utils/CLASSES.js";


// ---             --- //
///// --- LOGIN --- /////
// ---             --- //
export const loginController = async (req, res) => {
  console.log("||| ---  /auth/login  --- |||");

  // get user details
  const { gmail, password } = req.body;

  // check empty
  if (!gmail || !password) {
    return res.json(new RES("Please fill all details proparly", false, {}));
  }

  // check is exist
  const existUser = await userModel.findOne({ gmail: gmail });
  if (!existUser) {
    return res.json(new RES("Unvalid gmail", false, {}));
  }

  // compare password with DB
  const isCorrectPassword = await bcrypt.compare(password, existUser.password);
  if (!isCorrectPassword) {
    return res.json(new RES("Unvalid password", false, {}));
  }

  // set cookies
  const accessToken = existUser.tokens.accessToken;

  res
    .status(200)
    .cookie("__A_T_", accessToken, {
      expires: new Date(Date.now() + 60000 * 10),
      httpOnly: true,
      secure: false,
    })
    .json(
      new RES("User successfuly login", true, { username: existUser.username })
    );
};

// ---                --- //
///// --- REGISTER --- /////
// ---                --- //
export const registerController = async (req, res) => {
  console.log("||| ---  /auth/register  --- |||");

  // -- get user details
  const { username, gmail, phone, password, confirmPassword } = req.body;

  // -- check empty
  if (!username || !gmail || !phone || !password || !confirmPassword) {
    return res.json(new RES("Please fill all details proparly", false, {}));
  }

  // -- check requirements
  // #1 Gmail
  if (!gmail.includes("@") || !gmail.includes(".")) {
    return res.json(
      new RES("Unvalid gmail ( @ and . are required )", false, {})
    );
  }
  // #2 compare password
  if (password !== confirmPassword) {
    return res.json(new RES("Both password are unsame", false, {}));
  }
  // #3 phone number
  if (phone.toString().length !== 10) {
    return res.json(new RES("Unvalid phone number", false, {}));
  }

  // check already exist
  const existUser = await userModel.findOne({ gmail: gmail });
  if (existUser) {
    return res.json(new RES("User already exist", false, {}));
  }

  // generat tokens
  const accessToken = jwt.sign(
    { username, gmail },
    process.env.ACCESS_TOKEN_SECRET,
    {}
  );

  // bcrypt password
  const bcryptPassword = await bcrypt.hash(password, 12);

  // save in DB
  const newUser = {
    username,
    gmail,
    phone,
    tokens: { accessToken },
    password: bcryptPassword,
    isLogedIn: false,
  };

  const createdUser = await userModel.create(newUser);

  // check created user
  if (!createdUser) {
    return res.status(500).json(new RES("Internal server error", false, {}));
  }

  // res
  res.status(201).send(new RES("User successfuly created", true, {}));
};
