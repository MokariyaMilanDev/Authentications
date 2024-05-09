import mongoose, { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: {
      accessToken: {
        type: String,
        required: true,
        unique: true,
      },
    },
    isLogedIn: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

export { userModel }