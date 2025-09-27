import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import connectionRouter from "./routes/connectionRoutes.js";
import http from "http";
import { Server } from "socket.io";
import notificationRouter from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Allowed origins
const allowedOrigins = [
  "https://netwise-webapp-frontend.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

// ✅ Apply CORS to Express
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Explicitly add headers (extra safety)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/connection", connectionRouter);
app.use("/api/notification", notificationRouter);

// ✅ Configure Socket.IO with same CORS
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"], // WebSocket mainly uses GET for handshake
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// ✅ Socket.IO logic
export const userSocketMap = new Map();
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
startServer();
