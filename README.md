# 🏢 GlobalCo Career Portal — Technical Assessment Project

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://globalco-career-portal.vercel.app)
[![CI/CD Workflow](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/adityabhawsar221/globalco-career-portal/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

This full-stack recruitment portal was built by **Aditya Bhawsar** as a take-home technical assessment for the **Software Developer (Onsite — Hyderabad)** position at **GlobalCo**. 

It simulates a career portal and internal hiring system: candidates can explore jobs and track applications, while recruiters can manage candidates in an ATS dashboard and publish new job openings.

* **Live Demo:** [https://globalco-career-portal.vercel.app](https://globalco-career-portal.vercel.app)
* **GitHub Repo:** [https://github.com/adityabhawsar221/globalco-career-portal](https://github.com/adityabhawsar221/globalco-career-portal)

---

## 📖 Table of Contents

1. [Project Overview & Business Value](#1-project-overview--business-value)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [AI Integration & Workflow](#3-ai-integration--workflow)
4. [CI/CD & Deployment](#4-cicd--deployment)
5. [Local Setup & Installation](#5-local-setup--installation)
6. [Demo Accounts](#6-demo-accounts)
7. [API & Architecture Reference](#7-api--architecture-reference)
8. [Assessment Submission](#8-assessment-submission)

---

## 1. Project Overview & Business Value

### Problem Statement
Growing tech companies face three common hiring bottlenecks:
* **Scattered Resumes:** Resumes get lost across email inboxes and spreadsheets.
* **Slow Recruiter Workflows:** Teams lack a simple, single screen to review applicants, shortlist candidates, and update statuses.
* **Lack of Candidate Feedback:** Job applicants rarely have visibility into where their application stands.

### Target Audience
* **Job Candidates:** Applicants looking for engineering roles (such as Software Developer in Hyderabad) with transparent salary ranges in INR and application status tracking.
* **GlobalCo Recruiters:** HR team members managing candidate pipelines in a simple Kanban-style ATS and posting new openings.
* **Hiring Managers:** Team leads needing quick visibility into applicants and open roles.

### Key Features
* **Job Search & Multi-Filters:** Filter by title, department, work mode (`Onsite - Hyderabad`, `Hybrid`, `Remote`), and minimum salary.
* **1-Click Apply:** Submit contact info, portfolio/GitHub link, and cover letter in a simple popup modal.
* **Application Tracking:** Candidates can view their current application status (Applied → Shortlisted → Selected / Rejected).
* **Recruiter ATS Hub:** Recruiters can review applicants, update candidate stages with one click, and post or edit job listings.
* **Resilient Data Layer:** Uses MongoDB with an automatic in-memory fallback store, so anyone evaluating the project can test everything instantly with zero database setup.
* **Modern UI:** Responsive design with dark/light mode toggle and clean card layouts.

---

## 2. Tech Stack & Architecture

### Tech Stack
* **Frontend:** React 18, Vite, Context API (`JobContext`), Vanilla CSS3 (clean custom styles, no heavy frameworks).
* **Backend:** Node.js v20, Express.js (REST API, JWT authentication, `bcryptjs` password hashing).
* **Database:** MongoDB (Mongoose ODM) with built-in in-memory fallback store.
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
                        │      MongoDB       │   │  In-Memory Store   │
                        │ (Mongoose Schemas) │   │ Pre-seeded Demo DB │
                        └────────────────────┘   └────────────────────┘
```

---

## 3. AI Integration & Workflow

AI was used as a pair-programming assistant across the assignment: planning, writing code, creating tests, and configuring CI/CD.

### How AI Was Used
1. **Code Generation:** Generated React UI components, Express API routes, and Mongoose database schemas.
2. **Serverless Setup:** Structured the Express server so it runs smoothly on both local development and as a serverless function on Vercel.
3. **CI/CD Automation:** Created the GitHub Actions workflow to run automated tests and deploy to Vercel automatically.
4. **Unit Testing:** Created tests for password hashing and candidate application status updates using Node's built-in `node:test`.

### Prompts Log

| Phase | Prompt Used | Output |
| :--- | :--- | :--- |
| **Planning** | *"Design a full-stack career board for GlobalCo with a candidate portal, recruiter ATS, Express API, MongoDB, and Vercel deployment."* | Folder structure, REST endpoints list, and database schemas. |
| **Backend & DB** | *"Write an Express service with MongoDB Mongoose schemas, and an in-memory fallback if MONGODB_URI is not set."* | `backend/services/dbService.js` and data handlers. |
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
JWT_SECRET=your-secure-secret
# Optional: Provide MongoDB connection string or leave blank for in-memory store
MONGODB_URI=your-mongodb-connection-string
```

> **Security Note:** Never commit real secrets or environment files to the repository.

> **Note:** If `MONGODB_URI` is left blank, the app starts with pre-loaded sample GlobalCo jobs and candidate applications in the in-memory store right away!

### Step 3: Run the Project

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:5000`

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
| `POST` | `/api/seed` | Recruiter | Reset data with fresh sample dataset |

### Core Data Models (Mongoose Schemas)

#### Job Model
* `id` (String, unique)
* `title` (String)
* `company` (String, e.g., "GlobalCo")
* `location` (String, e.g., "Hyderabad, India (Onsite)")
* `locationType` ("Onsite" | "Hybrid" | "Remote")
* `category` (String)
* `salaryMin` / `salaryMax` (Numbers, INR)
* `tags`, `requirements`, `perks` (Arrays of Strings)
* `postedAt` (Date)

#### Application Model
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

## 8. Assessment Submission

* **Candidate:** Aditya Bhawsar  
* **Position:** Software Developer (Onsite — Hyderabad)  
* **Company:** GlobalCo  

This project was developed as part of the GlobalCo technical assessment.
