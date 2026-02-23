import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/socket-mvp");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error", error);
    process.exit(1);
  }
};
