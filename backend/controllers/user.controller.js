import { userModel } from "../models/User.model.js";
import { RES } from "../utils/CLASSES.js";

export const userController = async (req, res) => {
  console.log("||| ---  /:_id  --- |||");

  const paramsUsername = req.params.username;

  const User = await userModel.findOne({ username: paramsUsername }).select("-password");

  return res.json(new RES("user authenticated", true, {User}));
};