import mongoose from "mongoose";
import { initialJobs, initialApplications } from "../seedData.js";
import { JobModel } from "../models/jobModel.js";
import { ApplicationModel } from "../models/applicationModel.js";
import { UserModel } from "../models/userModel.js";
import { hashPassword, verifyPassword, generateToken } from "./authService.js";

async function ensureMongoConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;

  if (mongoose.connection.readyState === 1) return true;

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    return mongoose.connection.readyState === 1;
  } catch (err) {
    console.warn("⚠️ MongoDB connection warning:", err.message);
    return false;
  }
}

let memoryJobs = [...initialJobs];
let memoryApplications = [...initialApplications];
let memoryUsers = [];

export async function registerUser({ name, username, password, role = "candidate" }) {
  const trimmedUsername = (username || "").trim();
  if (!trimmedUsername) throw new Error("Username is required.");
  if (!password || password.length < 6) throw new Error("Password must be at least 6 characters long.");

  const normalizedName = trimmedUsername.toLowerCase();
  const profileName = (name || trimmedUsername).trim();
  const safeRole = role === "recruiter" ? "recruiter" : "candidate";

  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    const existingUser = await UserModel.findOne({ username: normalizedName }).lean();
    if (existingUser) throw new Error("Username already exists.");

    const passwordHash = await hashPassword(password);
    const newUser = await UserModel.create({
      id: `user-${Date.now()}`,
      name: profileName,
      username: normalizedName,
      passwordHash,
      role: safeRole
    });

    const user = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role
    };

    return { user, token: generateToken(user) };
  }

  const existingUser = memoryUsers.find((u) => u.username === normalizedName);
  if (existingUser) throw new Error("Username already exists.");

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `user-${Date.now()}`,
    name: profileName,
    username: normalizedName,
    passwordHash,
    role: safeRole,
    createdAt: new Date().toISOString()
  };
  memoryUsers.push(newUser);

  const user = {
    id: newUser.id,
    name: newUser.name,
    username: newUser.username,
    role: newUser.role
  };

  return { user, token: generateToken(user) };
}

export async function loginUser({ username, password }) {
  const trimmedUsername = (username || "").trim();
  if (!trimmedUsername || !password) throw new Error("Username and password are required.");

  const normalizedName = trimmedUsername.toLowerCase();

  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    const foundUser = await UserModel.findOne({ username: normalizedName }).lean();
    if (!foundUser) throw new Error("Invalid username or password.");

    const isValid = await verifyPassword(password, foundUser.passwordHash);
    if (!isValid) throw new Error("Invalid username or password.");

    const user = {
      id: foundUser.id,
      name: foundUser.name || foundUser.username,
      username: foundUser.username,
      role: foundUser.role
    };

    return { user, token: generateToken(user) };
  }

  const foundUser = memoryUsers.find((u) => u.username === normalizedName);
  if (!foundUser) throw new Error("Invalid username or password.");

  const isValid = await verifyPassword(password, foundUser.passwordHash);
  if (!isValid) throw new Error("Invalid username or password.");

  const user = {
    id: foundUser.id,
    name: foundUser.name || foundUser.username,
    username: foundUser.username,
    role: foundUser.role
  };

  return { user, token: generateToken(user) };
}

export async function getJobs({ query, category, locationType, jobType, minSalary }) {
  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (locationType && locationType !== "All") filter.locationType = locationType;
    if (jobType && jobType !== "All") filter.jobType = jobType;
    if (minSalary) filter.salaryMax = { $gte: Number(minSalary) };

    let jobs = await JobModel.find(filter).sort({ featured: -1, postedAt: -1 }).lean();

    if (query) {
      const q = query.toLowerCase();
      jobs = jobs.filter((j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        (j.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        j.location.toLowerCase().includes(q)
      );
    }

    return jobs;
  }

  let jobs = [...memoryJobs];
  if (category && category !== "All") jobs = jobs.filter((j) => j.category === category);
  if (locationType && locationType !== "All") jobs = jobs.filter((j) => j.locationType === locationType);
  if (jobType && jobType !== "All") jobs = jobs.filter((j) => j.jobType === jobType);
  if (minSalary) jobs = jobs.filter((j) => j.salaryMax >= Number(minSalary));
  if (query) {
    const q = query.toLowerCase();
    jobs = jobs.filter((j) =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      (j.tags || []).some((t) => t.toLowerCase().includes(q)) ||
      j.location.toLowerCase().includes(q)
    );
  }

  return jobs.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || new Date(b.postedAt) - new Date(a.postedAt));
}

export async function getJobById(id) {
  const isMongo = await ensureMongoConnection();
  if (isMongo) return await JobModel.findOne({ id }).lean();
  return memoryJobs.find((j) => j.id === id) || null;
}

export async function createJob(jobData) {
  const newJob = {
    id: `job-${Date.now()}`,
    postedAt: new Date().toISOString(),
    applicationCount: 0,
    featured: Boolean(jobData.featured),
    urgent: Boolean(jobData.urgent),
    salaryMin: Number(jobData.salaryMin) || 0,
    salaryMax: Number(jobData.salaryMax) || 0,
    tags: Array.isArray(jobData.tags)
      ? jobData.tags
      : (jobData.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    requirements: Array.isArray(jobData.requirements)
      ? jobData.requirements
      : (jobData.requirements || "").split("\n").map((r) => r.trim()).filter(Boolean),
    perks: Array.isArray(jobData.perks)
      ? jobData.perks
      : (jobData.perks || "").split("\n").map((p) => p.trim()).filter(Boolean),
    ...jobData
  };

  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    const created = await JobModel.create(newJob);
    return created.toObject();
  }

  memoryJobs.unshift(newJob);
  return newJob;
}

export async function deleteJob(id) {
  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    const res = await JobModel.deleteOne({ id });
    return res.deletedCount > 0;
  }

  const idx = memoryJobs.findIndex((j) => j.id === id);
  if (idx === -1) return false;
  memoryJobs.splice(idx, 1);
  return true;
}

export async function createApplication(appData) {
  const newApp = {
    id: `app-${Date.now()}`,
    appliedAt: new Date().toISOString(),
    status: "Applied",
    userId: appData.userId || appData.candidateId || "",
    candidateId: appData.candidateId || appData.userId || "",
    recruiterNote: "",
    ...appData
  };

  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    await JobModel.updateOne({ id: appData.jobId }, { $inc: { applicationCount: 1 } });
    const created = await ApplicationModel.create(newApp);
    return created.toObject();
  }

  const job = memoryJobs.find((j) => j.id === appData.jobId);
  if (job) job.applicationCount = (job.applicationCount || 0) + 1;

  memoryApplications.unshift(newApp);
  return newApp;
}

export async function updateApplicationStatus(applicationId, nextStatus) {
  const allowed = ["Applied", "Shortlisted", "Rejected", "Selected"];
  if (!allowed.includes(nextStatus)) throw new Error("Invalid application status.");

  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    const updated = await ApplicationModel.findOneAndUpdate(
      { id: applicationId },
      { $set: { status: nextStatus, updatedAt: new Date() } },
      { new: true }
    ).lean();

    if (!updated) throw new Error("Application not found.");
    return updated;
  }

  const appIndex = memoryApplications.findIndex((app) => app.id === applicationId);
  if (appIndex === -1) throw new Error("Application not found.");

  memoryApplications[appIndex].status = nextStatus;
  return memoryApplications[appIndex];
}

export async function getApplications() {
  const isMongo = await ensureMongoConnection();
  if (isMongo) return await ApplicationModel.find().sort({ appliedAt: -1 }).lean();
  return memoryApplications;
}

export async function getApplicationsForUser(userId) {
  if (!userId) return [];
  const isMongo = await ensureMongoConnection();
  if (isMongo) return await ApplicationModel.find({ userId }).sort({ appliedAt: -1 }).lean();
  return memoryApplications.filter((app) => app.userId === userId || app.candidateId === userId);
}

export async function getStats() {
  const jobs = await getJobs({});
  const apps = await getApplications();

  const totalJobs = jobs.length;
  const totalApplications = apps.length;
  const remoteJobs = jobs.filter((j) => j.locationType === "Remote").length;
  const featuredJobs = jobs.filter((j) => j.featured).length;

  const categories = jobs.reduce((acc, j) => {
    acc[j.category] = (acc[j.category] || 0) + 1;
    return acc;
  }, {});

  return {
    totalJobs,
    totalApplications,
    remoteJobs,
    featuredJobs,
    remotePercentage: totalJobs ? Math.round((remoteJobs / totalJobs) * 100) : 0,
    categories
  };
}

export async function resetSeed() {
  const isMongo = await ensureMongoConnection();
  if (isMongo) {
    await JobModel.deleteMany({});
    await ApplicationModel.deleteMany({});
    await JobModel.insertMany(initialJobs);
    await ApplicationModel.insertMany(initialApplications);
    return true;
  }

  memoryJobs = [...initialJobs];
  memoryApplications = [...initialApplications];
  return true;
}

export const dbService = {
  registerUser,
  loginUser,
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  createApplication,
  updateApplicationStatus,
  getApplications,
  getApplicationsForUser,
  getStats,
  resetSeed
};
