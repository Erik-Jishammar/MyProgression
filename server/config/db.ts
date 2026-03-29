import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017");
        console.log("MongoDB connected");
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
        throw err;
    }
}

export default connectDB


