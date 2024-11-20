import mongoose from "mongoose";
import env from "@/env";
import logger from "@/utils/logger";

const MONGODB_URI = env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI, { dbName: "prestige_stays" });
      logger.info("Connected to MongoDB");
    } else {
      logger.info("Using existing MongoDB connection");
    }
  } catch (error) {
    logger.error("Error connecting to MongoDB", error);
    throw error;
  }
};

export default dbConnect;
