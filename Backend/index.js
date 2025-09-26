import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import connectionRouter from "./routes/connectionRoutes.js";
import http from "http"
import { Server } from "socket.io";
import notificationRouter from "./routes/notificationRoutes.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
// Dynamic allowed origins for CORS
const allowedOrigins = ["https://netwise-webapp-frontend.onrender.com","http://localhost:5173", "http://localhost:5174"];
export const io = new Server(server, {
  cors: ({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
});
// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());


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
app.use("/api/post",postRouter)
app.use("/api/connection",connectionRouter)
app.use("/api/notification",notificationRouter)

export const userSocketMap=new Map();
io.on("connection", (socket) => {
  console.log("user connected", socket.id)
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
})

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
