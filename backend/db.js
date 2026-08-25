import mongoose from "mongoose";
import { initialJobs, initialApplications } from "./seedData.js";
import { JobModel } from "./models/jobModel.js";
import { ApplicationModel } from "./models/applicationModel.js";
import { UserModel } from "./models/userModel.js";
import { dbService } from "./services/dbService.js";
import { hashPassword, verifyPassword, verifyToken } from "./services/authService.js";

let isConnected = false;

const DEFAULT_MONGO_URI = "mongodb+srv://ownerOfApp:Aditya%40123@cluster0.lf76dnr.mongodb.net/hirepulse-jobs-board?retryWrites=true&w=majority";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || DEFAULT_MONGO_URI;

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    isConnected = mongoose.connection.readyState === 1;
    if (isConnected) {
      console.log("✅ Successfully connected to MongoDB Atlas!");

      const jobsCount = await JobModel.countDocuments();
      const applicationsCount = await ApplicationModel.countDocuments();
      const hasNonGlobalCoJobs = await JobModel.exists({ company: { $ne: "GlobalCo" } });
      const hasNonGlobalCoApplications = await ApplicationModel.exists({ company: { $ne: "GlobalCo" } });

      if (jobsCount === 0 || hasNonGlobalCoJobs) {
        await JobModel.deleteMany({});
        await JobModel.insertMany(initialJobs);
        console.log(`🌱 Re-seeded ${initialJobs.length} GlobalCo jobs into MongoDB.`);
      }

      if (applicationsCount === 0 || hasNonGlobalCoApplications) {
        await ApplicationModel.deleteMany({});
        await ApplicationModel.insertMany(initialApplications);
        console.log(`🌱 Re-seeded ${initialApplications.length} GlobalCo applications into MongoDB.`);
      }
    }
    return isConnected;
  } catch (err) {
    isConnected = false;
    console.warn("⚠️ MongoDB connection warning:", err.message);
    return false;
  }
}

export function isMongoReady() {
  return mongoose.connection.readyState === 1;
}

export { dbService };
export { hashPassword, verifyPassword, verifyToken };
export { JobModel, ApplicationModel, UserModel };
