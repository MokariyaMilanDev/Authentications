import mongoose from "mongoose";

const connect_mongoDB = async (url) => {
  try {
    const DB = await mongoose.connect(url);
    console.log("DB connected");
    return DB;
  } catch (error) {
    console.log("DB Error : ", error);
  }
};

export default connect_mongoDB;