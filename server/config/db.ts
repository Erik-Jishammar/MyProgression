import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

export async function connectDB(): Promise<void> {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
    throw err;
  }
}

export { client };
