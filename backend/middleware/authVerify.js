import { userModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import {RES } from "../utils/CLASSES.js";

export const authVerify = async (req, res, next) => {
  console.log("||| --- authVerify --- |||");

  // get access token
  const accessToken = req.cookies.__A_T_;

  // check access token
  const isValidAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  if (!isValidAccessToken) {
    return res.json(new RES("Unvalid token (JWT)", false, {}));
  }

  // get access token username & gmail
  const accessTokenUsername = isValidAccessToken.username;
  const accessTokenGmail = isValidAccessToken.gmail;

  // get username
  const paramsUsername = req.params.username;

  // check user
  const isExistUser = await userModel.findOne({ username: paramsUsername });
  if (!isExistUser) {
    return res.json(new RES(`User not exist (${paramsUsername})`, false, {}));
  }

  const DB_id = isExistUser._id;
  const DBusername = isExistUser.username;
  const DBgmail = isExistUser.gmail;

  // compare access token details to DB details
  if(accessTokenUsername !== DBusername || accessTokenGmail !== DBgmail){
    return res.json(new RES("Unvalid token (DB)", false, {}));
  }

  // console.log("NEXT()");
  next();
};
