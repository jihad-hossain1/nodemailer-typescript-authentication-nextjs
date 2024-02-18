import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("database connected successfull..");
    });

    connection.on("error", (error) => {
      console.log("database connection error: ", error);
      process.exit();
    });
  } catch (error) {
    console.log("error for connected on database: ", error);
  }
};
