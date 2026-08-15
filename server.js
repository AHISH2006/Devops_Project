import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./backend/config/db.js";
import authRoutes from "./backend/routes/authRoutes.js";
import reportRoutes from "./backend/routes/reportRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
