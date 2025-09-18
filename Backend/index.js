import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Dynamic allowed origins for CORS
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
