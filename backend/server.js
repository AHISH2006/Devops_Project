import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ── Health Check Endpoint ────────────────────────────────────
// Used by Docker HEALTHCHECK, Jenkins, and monitoring tools
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? "connected" :
    dbState === 2 ? "connecting" :
    dbState === 3 ? "disconnecting" : "disconnected";

  res.status(dbState === 1 ? 200 : 503).json({
    status: dbState === 1 ? "ok" : "degraded",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    service: "devops-backend",
    version: "1.0.0",
    database: dbStatus,
  });
});

// ── MongoDB Connection ───────────────────────────────────────
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/physioDB";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ── API Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// ── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
