import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String, default: "" },
  location: { type: String, required: true },
  locationType: { type: String, enum: ["Remote", "Hybrid", "Onsite"], default: "Onsite" },
  category: { type: String, required: true },
  jobType: { type: String, enum: ["Full-Time", "Part-Time", "Contract", "Internship"], default: "Full-Time" },
  experienceLevel: { type: String, default: "Mid Level" },
  salaryMin: { type: Number, required: true },
  salaryMax: { type: Number, required: true },
  salaryCurrency: { type: String, default: "INR" },
  featured: { type: Boolean, default: false },
  urgent: { type: Boolean, default: false },
  tags: [String],
  description: { type: String, required: true },
  requirements: [String],
  perks: [String],
  postedAt: { type: Date, default: Date.now },
  applicationCount: { type: Number, default: 0 },
  employerEmail: { type: String, required: true }
});

export const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
