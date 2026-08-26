# 🏢 GlobalCo Career Portal — Technical Assessment Project

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://globalco-career-portal.vercel.app)
[![API Status](https://img.shields.io/badge/API%20Status-Operational-success?style=for-the-badge&logo=fastapi)](https://globalco-career-portal.vercel.app/api/health)
[![CI/CD Workflow](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/adityabhawsar221/globalco-career-portal/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

This full-stack recruitment portal was built by **Aditya Bhawsar** as a take-home technical assessment for the **Software Developer (Onsite — Hyderabad)** position at **GlobalCo**. 

It simulates a career portal and internal hiring system: candidates can explore jobs and track applications, while recruiters can manage candidates in an ATS dashboard and publish new job openings.

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
8. [Candidate Details](#8-candidate-details)

---

## 1. Project Overview & Business Value

### Problem Statement
Growing tech companies face three common hiring bottlenecks:
* **Scattered Resumes:** Resumes get lost across email inboxes and spreadsheets.
* **Slow Recruiter Workflows:** Teams lack a simple, single screen to review applicants, shortlist candidates, and update statuses.
* **Lack of Candidate Feedback:** Job applicants rarely have visibility into where their application stands.

### Target Audience
* **Job Candidates:** Applicants looking for engineering roles (such as Software Developer in Hyderabad) with transparent salary ranges in INR and real-time status tracking.
* **GlobalCo Recruiters:** HR team members managing candidate pipelines in a simple Kanban-style ATS and posting new openings.
* **Hiring Managers:** Team leads needing quick visibility into applicants and open roles.

### Key Features
* **Job Search & Multi-Filters:** Filter by title, department, work mode (`Onsite - Hyderabad`, `Hybrid`, `Remote`), and minimum salary.
* **1-Click Apply:** Submit contact info, portfolio/GitHub link, and cover letter in a simple popup modal.
* **Live Application Tracker:** Candidates see their application progress in real time (`Applied` ➔ `Shortlisted` ➔ `Selected` / `Rejected`).
* **Recruiter ATS Hub:** Recruiters can review applicants, update candidate stages with one click, and post or edit job listings.
* **Zero Downtime Fallback:** Uses MongoDB Atlas for cloud storage. If cloud database credentials are missing or slow, it switches to an in-memory database automatically so the app never crashes during review.
* **Modern UI:** Responsive design with dark/light mode toggle and clean card layouts.

---

## 2. Tech Stack & Architecture

### Tech Stack
* **Frontend:** React 18, Vite, Context API (`JobContext`), Vanilla CSS3 (clean custom styles, no heavy frameworks).
* **Backend:** Node.js v20, Express.js (REST API, JWT authentication, `bcryptjs` password hashing).
* **Database:** MongoDB Atlas (Mongoose ODM) + built-in In-Memory fallback store.
* **Testing:** Node.js Native Test Runner (`node:test`).
* **CI/CD:** GitHub Actions (`.github/workflows/ci-cd.yml`).
* **Hosting:** Vercel (React Frontend + Serverless Express API at `/api`).

### Architecture Diagram

```
                        ┌─────────────────────────────────────┐
                        │           Browser Client            │
                        │    React 18 + Vite (Dark/Light UI)  │
                        └──────────────────┬──────────────────┘
                                           │
                                           │ HTTPS API Calls (/api/*)
                                           ▼
                        ┌─────────────────────────────────────┐
                        │      Vercel Edge Router & CDN       │
                        │ Static Frontend (dist/) & API Route │
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

AI was used as a pair-programming assistant across the entire assignment: planning, writing code, fixing bugs, and setting up CI/CD.

### How AI Was Used
1. **Code Writing:** Created React UI components, Express API routes, and database models.
2. **Architecture Planning:** Structured the project so the Express server works both on my local machine and as a serverless function on Vercel.
3. **CI/CD Setup:** Wrote the GitHub Actions workflow to run automated tests and deploy to Vercel.
4. **Unit Testing:** Wrote tests for password hashing and candidate application status updates using Node's built-in `node:test`.

### Real Problems Solved With AI (Simplified)

* **1. Database Disconnecting on the Cloud:**
  * *What happened:* On Vercel, the server turns off when nobody is visiting the site. When someone opened the page again, the database was disconnected, making the site slow or show an error.
  * *How AI helped:* AI helped create an automatic connection check. Every time a request comes in, the app makes sure the database is connected before fetching data, keeping the website fast and reliable.

* **2. Added Jobs Disappeared After Server Restart:**
  * *What happened:* When a recruiter added a new job listing, it showed up on screen. But whenever the server restarted, the code wiped the database and reloaded the default sample jobs, losing all newly created jobs.
  * *How AI helped:* AI found the line of code that was clearing the database on startup. We changed it so starter jobs are only loaded once. Any new jobs added by recruiters are now saved permanently.

* **3. Frontend Could Not Talk to Backend:**
  * *What happened:* On my local laptop, the React frontend runs on port 3000 and the Express backend runs on port 5000. On Vercel, everything runs under one web address. This caused connection errors when trying to fetch jobs.
  * *How AI helped:* AI helped configure the routing rules. Now the frontend talks to the backend smoothly on my local computer during development, and also on the live Vercel website without any connection errors.

### Prompts Log

| Phase | Prompt Used | Output |
| :--- | :--- | :--- |
| **Planning** | *"Design a full-stack career board for GlobalCo with a candidate portal, recruiter ATS, Express API, MongoDB Atlas, and Vercel deployment."* | Folder structure, REST endpoints list, and database schemas. |
| **Database** | *"Write a database service in Express that connects to MongoDB Atlas, but falls back to in-memory mock data if MONGODB_URI is not set."* | `backend/services/dbService.js` and `backend/db.js` with failover logic. |
| **Recruiter ATS** | *"Build a React component where recruiters can view candidate applications and click buttons to change status to Shortlisted, Selected, or Rejected."* | `DashboardView.jsx` with instant status updates and recruitment stats. |
| **CI/CD** | *"Create a GitHub Actions workflow that caches npm packages, runs backend unit tests, builds the Vite frontend, and deploys to Vercel on main branch push."* | `.github/workflows/ci-cd.yml` with CI and CD pipeline jobs. |
| **Testing** | *"Write unit tests using node:test for password hashing and candidate application status updates."* | `backend/test/auth.test.js` running in under 200ms with zero extra dependencies. |

---

## 4. CI/CD & Deployment

The deployment pipeline is automated using GitHub Actions in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml).

### Pipeline Steps

```
Push code to 'main'
   │
   ▼
[Job 1: Continuous Integration (CI)]
   ├─ 1. Download repository code
   ├─ 2. Setup Node.js v20 with npm caching
   ├─ 3. Install backend dependencies (npm ci)
   ├─ 4. Run automated tests (npm test)
   ├─ 5. Install frontend dependencies (npm ci)
   ├─ 6. Build production frontend (npm run build)
   └─ 7. Check that build files exist
   │
   ▼ (Only runs if all tests pass)
[Job 2: Continuous Deployment (CD)]
   ├─ 1. Log into Vercel using repository secrets
   └─ 2. Deploy live to https://globalco-career-portal.vercel.app
```

### Why This Pipeline Works
* **Safe:** The app will never deploy to production if tests fail.
* **Fast:** Package caching keeps the build time under 40 seconds.
* **Consistent:** `npm ci` uses locked dependency versions so it works the same on every machine.

---

## 5. Local Setup & Installation

Run the project locally in under 2 minutes:

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
Create a `.env` file in the `backend/` folder:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=globalco-secret-key-2026
# Optional: Add your MongoDB URI, or leave blank to use the built-in In-Memory DB
MONGODB_URI=
```

> **Note:** If `MONGODB_URI` is left blank, the app starts with sample GlobalCo jobs and applications automatically.

### Step 3: Run the Project

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:5000` (Health check: `http://localhost:5000/api/health`)

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
Runs the automated unit tests. All tests pass with 0 errors.

---

## 6. Demo Accounts

Use these pre-made accounts to test the app without signing up:

| Role | Username | Password | What You Can Do |
| :--- | :--- | :--- | :--- |
| **HR Recruiter** | `recruiter` | `recruiter123` | View ATS pipeline, change candidate status, post and edit jobs |
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
| `POST` | `/api/applications` | Candidate | Submit a job application |
| `GET` | `/api/applications` | Recruiter | View all candidate applications in ATS |
| `GET` | `/api/applications/me` | Candidate | View my submitted applications |
| `PATCH`| `/api/applications/:id/status` | Recruiter | Change candidate status (`Shortlisted`, `Selected`, `Rejected`) |
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

## 8. Candidate Details

* **Candidate Name:** Aditya Bhawsar
* **Applying For:** Software Developer (Onsite — Hyderabad)
* **Application Target:** GlobalCo
* **Email:** [adityabhawar21@gmail.com](mailto:adityabhawar21@gmail.com)
* **Note:** This project is a technical assessment submission created as part of the recruitment process for GlobalCo.
