import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";
import connectCloudinary from "./config/cloudinary.js";
dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  // Vercel frontend (update if you use a custom domain)
  "https://restaurant-app-rho-six.vercel.app",
];

const envOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOrigins = [...new Set([...allowedOrigins, ...envOrigins])];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (corsOrigins.includes(origin)) return true;

  // In case you deploy to another *.vercel.app hostname
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};
// database connection
connectDB();
connectCloudinary();
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  })
);
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
