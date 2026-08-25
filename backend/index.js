import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbService, verifyToken, connectDB } from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Authorization token required" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
}

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    message: "GlobalCo Career Portal API is operational"
  });
});

router.post("/auth/register", async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    const authData = await dbService.registerUser({ name, username, password, role });
    res.status(201).json({ success: true, data: authData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || "Registration failed" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const authData = await dbService.loginUser({ username, password });
    res.json({ success: true, data: authData });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message || "Invalid credentials" });
  }
});

router.get("/auth/me", requireAuth, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

router.get("/jobs", async (req, res) => {
  try {
    const { q, category, locationType, jobType, minSalary } = req.query;
    const jobs = await dbService.getJobs({
      query: q,
      category,
      locationType,
      jobType,
      minSalary
    });
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, error: "Failed to fetch jobs" });
  }
});

router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await dbService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job listing not found" });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch job details" });
  }
});

router.post("/jobs", requireAuth, async (req, res) => {
  try {
    const { title, company, location, salaryMin, salaryMax, description, employerEmail } = req.body;
    if (!title || !company || !location || !salaryMin || !salaryMax || !description || !employerEmail) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title, company, location, salaryMin, salaryMax, description, employerEmail"
      });
    }

    const newJob = await dbService.createJob(req.body);
    res.status(201).json({ success: true, message: "Job created successfully", data: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, error: "Failed to create job listing" });
  }
});

router.put("/jobs/:id", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ success: false, error: "Only recruiters can edit job listings" });
    }
    const updated = await dbService.updateJob(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }
    res.json({ success: true, message: "Job listing updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ success: false, error: "Failed to update job listing" });
  }
});

router.delete("/jobs/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await dbService.deleteJob(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Job not found or already deleted" });
    }
    res.json({ success: true, message: "Job listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete job" });
  }
});

router.post("/applications", requireAuth, async (req, res) => {
  try {
    const { jobId, applicantName, applicantEmail, coverLetter } = req.body;
    if (!jobId || !applicantName || !applicantEmail || !coverLetter) {
      return res.status(400).json({
        success: false,
        error: "Missing required application fields: jobId, applicantName, applicantEmail, coverLetter"
      });
    }

    const newApp = await dbService.createApplication(req.body);
    res.status(201).json({ success: true, message: "Application submitted successfully", data: newApp });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ success: false, error: "Failed to submit application" });
  }
});

router.get("/applications", requireAuth, async (req, res) => {
  try {
    const apps = await dbService.getApplications();
    res.json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch applications" });
  }
});

router.get("/applications/me", requireAuth, async (req, res) => {
  try {
    const apps = await dbService.getApplicationsForUser(req.user.id);
    res.json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch your applications" });
  }
});

router.patch("/applications/:id/status", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ success: false, error: "Only recruiters can update application status" });
    }

    const { status } = req.body;
    const updated = await dbService.updateApplicationStatus(req.params.id, status);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || "Failed to update application status" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const stats = await dbService.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch statistics" });
  }
});

router.post("/seed", requireAuth, async (req, res) => {
  try {
    await dbService.resetSeed();
    res.json({ success: true, message: "Database re-seeded with initial sample data" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to seed database" });
  }
});

// Mount on both /api and root /
app.use("/api", router);
app.use("/", router);

const PORT = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.warn("⚠️ Startup DB check failed:", error.message);
  }

  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`🚀 GlobalCo Career Portal API running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
