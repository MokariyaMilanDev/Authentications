import express from "express";
import cors from "cors";
import dotent from "dotenv";
import cookieParser from "cookie-parser";
import connect_mongoDB from "./DB/DBconnection.js";

// --- APP --- //
const app = express();

// -- middlwares --- //
app.use(cookieParser());
app.use(express.json());

// --- configuration --- //
dotent.config({ path: "./.env" });
app.use(cors({ credentials: true, origin: true }));

// ---               --- //
///// --- MongoDB --- /////
// ---               --- //
import { userModel } from "./models/User.model.js";
// ! add you mongoDB url
const DB = await connect_mongoDB("mongodb://localhost:27017/Auth");

// ---              --- //
///// --- Routes --- /////
// ---              --- //
import authRouter from "./routes/auth.route.js";
import { userController } from "./controllers/user.controller.js";
import { authVerify } from "./middleware/authVerify.js";

// ---  auth router  --- //
app.use("/auth", authRouter);

/// --- :_id --- ///
app.post("/:username", authVerify, userController);

// ---                --- //
///// --- listener --- /////
// ---                --- //
app.listen(process.env.PORT, () => {
  console.log(`Server is runing on port ${process.env.PORT}`);
});
