# 🏢 GlobalCo — Career & Hiring Portal

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://globalco-career-portal.vercel.app)
[![API Status](https://img.shields.io/badge/API%20Status-Operational-success?style=for-the-badge&logo=fastapi)](https://globalco-career-portal.vercel.app/api/health)
[![CI/CD Workflow](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/adityabhawsar221/globalco-career-portal/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A modern full-stack hiring portal built for **GlobalCo**. It connects candidates with open engineering roles and gives recruiters a built-in Applicant Tracking System (ATS) to manage candidates and post jobs.

* **Live Demo:** [https://globalco-career-portal.vercel.app](https://globalco-career-portal.vercel.app)
* **GitHub Repo:** [https://github.com/adityabhawsar221/globalco-career-portal](https://github.com/adityabhawsar221/globalco-career-portal)
* **API Health Check:** [https://globalco-career-portal.vercel.app/api/health](https://globalco-career-portal.vercel.app/api/health)

---

## 📖 Table of Contents

1. [Project Overview & Business Value](#1-project-overview--business-value)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [AI Integration & Workflow](#3-ai-integration--workflow)
4. [CI/CD & Deployment](#4-cicd--deployment)
5. [Local Setup & Installation](#5-local-setup--installation)
6. [Demo Accounts](#6-demo-accounts)
7. [API & Architecture Reference](#7-api--architecture-reference)

---

## 1. Project Overview & Business Value

### Problem Statement
Growing tech hubs face three major hiring problems:
* **Scattered Resumes:** Applications get lost across emails, job boards, and spreadsheets.
* **Slow Recruiter Workflows:** Teams lack a simple way to shortlist, interview, and track applicants in one place.
* **Poor Candidate Experience:** Applicants rarely know where their application stands.

### Target Audience
* **Candidates:** Job seekers looking for roles (e.g., Software Developer in Hyderabad) with transparent pay in INR.
* **GlobalCo Recruiters:** HR teams managing job posts and reviewing applicants in a dedicated ATS dashboard.
* **Engineering Leads:** Team leads who want quick visibility into active applications.

### Key Features
* **Live Search & Filter:** Search by job title, department, location (`Onsite - Hyderabad`, `Hybrid`, `Remote`), and salary.
* **1-Click Apply:** Submit contact info, portfolio link, and cover letter directly.
* **Application Tracker:** Candidates track their status in real time (`Applied` ➔ `Shortlisted` ➔ `Selected` / `Rejected`).
* **Recruiter ATS Hub:** Recruiters can view applications, update candidate stages, and publish new job openings.
* **Zero Downtime Fallback:** Uses MongoDB Atlas for storage. If cloud database credentials are missing, it switches to an in-memory database automatically so the app never crashes.
* **Responsive UI:** Dark and light mode toggle with clean glassmorphic styling.

---

## 2. Tech Stack & Architecture

### Tech Stack
* **Frontend:** React 18, Vite, Context API (`JobContext`), Vanilla CSS3 (custom design system, no bulky CSS libraries).
* **Backend:** Node.js v20, Express.js (REST API, JWT authentication, `bcryptjs` password hashing).
* **Database:** MongoDB Atlas (Mongoose ODM) + automatic In-Memory fallback store.
* **Testing:** Node.js Native Test Runner (`node:test`).
* **CI/CD:** GitHub Actions (`.github/workflows/ci-cd.yml`).
* **Hosting:** Vercel (Frontend SPA + Serverless Functions via `/api/index.js`).

### Architecture Diagram

```
                        ┌─────────────────────────────────────┐
                        │           Browser Client            │
                        │    React 18 + Vite (Dark/Light UI)  │
                        └──────────────────┬──────────────────┘
                                           │
                                           │ HTTPS REST Calls (/api/*)
                                           ▼
                        ┌─────────────────────────────────────┐
                        │      Vercel Edge Router & CDN       │
                        │ Static Assets (dist/) & Serverless  │
                        └──────────────────┬──────────────────┘
                                           │
                                           ▼
                        ┌─────────────────────────────────────┐
                        │       Express REST API Engine       │
                        │   JWT Auth • CORS • Routes Handlers │
                        └──────────┬────────────────┬─────────┘
                                   │                │
                        (Primary)  ▼                ▼  (Fallback)
                        ┌────────────────────┐   ┌────────────────────┐
                        │ MongoDB Atlas      │   │ In-Memory DB       │
                        │ Cloud Database     │   │ Zero-Downtime Mock │
                        └────────────────────┘   └────────────────────┘
```

---

## 3. AI Integration & Workflow

AI was used as a pair programmer throughout the build: planning, coding, debugging, and setting up CI/CD.

### How AI Was Used
1. **Code Generation:** Built React components, Express route handlers, and Mongoose schemas.
2. **Architecture Planning:** Structured the project so Express routes run seamlessly on both local development and Vercel serverless.
3. **CI/CD Automation:** Created the GitHub Actions workflow with dependency caching, unit tests, and Vercel deployment.
4. **Unit Tests:** Wrote fast integration tests using Node's built-in `node:test` runner.

### Real Problems Solved With AI
* **Serverless Connection Limits:** Multiple requests on Vercel opened new MongoDB connections and caused timeouts. With AI, a singleton connection pool was created with auto-connect middleware to reuse active connections.
* **Preventing Data Wipe on Cold Start:** The early seed script cleared jobs using `deleteMany()`. On serverless cold starts, this erased newly posted jobs. AI helped refactor this to only seed if `countDocuments() === 0`.
* **Vite Proxy vs Production Routing:** Locally, Vite proxies `/api` to port 5000. For production, `vercel.json` rewrites were configured to point `/api/(.*)` to the serverless function without CORS issues.

### Prompts Log

| Phase | Prompt Used | Output |
| :--- | :--- | :--- |
| **Architecture** | *"Design a full-stack career board for GlobalCo with a candidate portal, recruiter ATS, Express API, MongoDB Atlas, and Vercel deployment."* | Project file tree, REST endpoints list, and Mongoose schema structure. |
| **Database** | *"Write a database service in Express that connects to MongoDB Atlas, but falls back to in-memory mock data if MONGODB_URI is not set."* | `backend/services/dbService.js` and `backend/db.js` with failover logic. |
| **Recruiter ATS** | *"Build a React component where recruiters can view candidate applications and click buttons to change status to Shortlisted, Selected, or Rejected."* | `DashboardView.jsx` with instant status updates and recruitment stats. |
| **CI/CD** | *"Create a GitHub Actions workflow that caches npm packages, runs backend unit tests, builds the Vite frontend, and deploys to Vercel on main branch push."* | `.github/workflows/ci-cd.yml` with CI and CD pipeline jobs. |
| **Testing** | *"Write unit tests using node:test for password hashing and candidate application status updates."* | `backend/test/auth.test.js` running in under 200ms with zero extra dependencies. |

---

## 4. CI/CD & Deployment

The deployment pipeline is automated using GitHub Actions in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml).

### Pipeline Steps

```
Push to 'main'
   │
   ▼
[Job 1: Continuous Integration (CI)]
   ├─ 1. Checkout repository code
   ├─ 2. Setup Node.js v20 with npm caching
   ├─ 3. Install backend dependencies (npm ci)
   ├─ 4. Run automated tests (npm test)
   ├─ 5. Install frontend dependencies (npm ci)
   ├─ 6. Build production bundle (npm run build)
   └─ 7. Verify build output files
   │
   ▼ (Only if CI passes)
[Job 2: Continuous Deployment (CD)]
   ├─ 1. Authenticate with Vercel API
   └─ 2. Deploy live to https://globalco-career-portal.vercel.app
```

### Why This Pipeline Works
* **Safe:** CD never runs if tests fail.
* **Fast:** Dependency caching keeps CI run time around 35 seconds.
* **Reliable:** `npm ci` uses `package-lock.json` so builds are 100% reproducible.

---

## 5. Local Setup & Installation

Get the project running locally in under 2 minutes:

### Prerequisites
* Node.js v18 or v20
* npm v9 or higher
* Git

### Step 1: Clone the Repo
```bash
git clone https://github.com/adityabhawsar221/globalco-career-portal.git
cd globalco-career-portal
```

### Step 2: Environment Variables
Create a `.env` file in `backend/`:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=globalco-secret-key-2026
# Optional: Add MongoDB URI or leave empty to use the In-Memory DB
MONGODB_URI=
```

> **Note:** If `MONGODB_URI` is left blank, the app starts with sample GlobalCo jobs and applications automatically.

### Step 3: Run the Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:5000` (Health: `http://localhost:5000/api/health`)

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:3000`

### Step 4: Run Tests
```bash
cd backend
npm test
```
Runs native unit tests with 100% pass rate.

---

## 6. Demo Accounts

Use these accounts to test the app without signing up:

| Role | Username | Password | What You Can Do |
| :--- | :--- | :--- | :--- |
| **HR Recruiter** | `recruiter` | `recruiter123` | View ATS pipeline, change candidate status, post/edit jobs |
| **Candidate** | `candidate` | `candidate123` | Apply to jobs, track application status, bookmark jobs |
| **Guest** | *(None)* | *(None)* | Browse job listings, filter by location and salary |

---

## 7. API & Architecture Reference

### REST API Endpoints

| Method | Endpoint | Access | Description |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/health` | Public | Check if the API is running |
| `POST` | `/api/auth/register` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Login and get JWT token |
| `GET` | `/api/auth/me` | Logged In | Get current user profile |
| `GET` | `/api/jobs` | Public | Search and filter jobs |
| `GET` | `/api/jobs/:id` | Public | Get full details of one job |
| `POST` | `/api/jobs` | Recruiter | Post a new job opening |
| `PUT` | `/api/jobs/:id` | Recruiter | Edit an existing job opening |
| `DELETE`| `/api/jobs/:id` | Recruiter | Delete a job opening |
| `POST` | `/api/applications` | Candidate | Submit job application |
| `GET` | `/api/applications` | Recruiter | View all candidate applications |
| `GET` | `/api/applications/me` | Candidate | View my submitted applications |
| `PATCH`| `/api/applications/:id/status` | Recruiter | Change candidate status |
| `GET` | `/api/stats` | Public | Get live recruitment stats |
| `POST` | `/api/seed` | Recruiter | Reset database with fresh sample data |

### Core Database Schemas

#### Job Schema
* `id` (String, unique)
* `title` (String)
* `company` (String, e.g., "GlobalCo")
* `location` (String, e.g., "Hyderabad, India (Onsite)")
* `locationType` ("Onsite" | "Hybrid" | "Remote")
* `category` (String)
* `salaryMin` / `salaryMax` (Numbers, INR)
* `tags`, `requirements`, `perks` (Arrays of Strings)
* `postedAt` (Date)

#### Application Schema
* `id` (String, unique)
* `jobId` (String)
* `jobTitle` (String)
* `applicantName` (String)
* `applicantEmail` (String)
* `applicantPhone` (String)
* `experienceYears` (String)
* `portfolioUrl` (String)
* `coverLetter` (String)
* `status` ("Applied" | "Shortlisted" | "Selected" | "Rejected")
* `appliedAt` (Date)

---

## 8. Author & Notes

* **Candidate:** Aditya Bhawsar
* **Role:** Software Developer (Onsite — Hyderabad)
* **Company:** GlobalCo
* **Email:** [adityabhawsar221@gmail.com](mailto:adityabhawsar221@gmail.com)

Built for the GlobalCo technical assessment. Ready for review and deployment!
