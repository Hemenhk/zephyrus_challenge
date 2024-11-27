import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/tasks", taskRoutes);

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_DB as string;
    if (!mongoUri) {
      throw new Error("MongoDB connection string is missing.");
    }

    await mongoose.connect(mongoUri);
    console.log("DB connected!");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
