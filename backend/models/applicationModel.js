import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String, required: true },
  experienceYears: { type: String, default: "0" },
  portfolioUrl: { type: String, default: "" },
  coverLetter: { type: String, required: true },
  userId: { type: String, default: "" },
  candidateId: { type: String, default: "" },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Applied", "Shortlisted", "Rejected", "Selected"], default: "Applied" },
  recruiterNote: { type: String, default: "" }
});

export const ApplicationModel = mongoose.models.Application || mongoose.model("Application", applicationSchema);
