import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reportData: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", ReportSchema);
