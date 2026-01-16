import express, { Application } from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app: Application = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log("listening", PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));

export const client = mongoose.connection.getClient().db();
