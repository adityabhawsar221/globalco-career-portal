```markdown
# 🏢 GlobalCo — Official Career & Talent Portal

![Node.js](https://img.shields.io/badge/Node.js-v20-green?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Express](https://img.shields.io/badge/Express-4.19-lightgray?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?style=flat-square&logo=githubactions)
![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)
![Assessment](https://img.shields.io/badge/Assessment-Software%20Developer%20(Onsite%20Hyderabad)-purple?style=flat-square)

The **GlobalCo Career & Talent Portal** is a production-ready web application built for **GlobalCo**. It connects job seekers with hiring teams by allowing candidates to search, apply for, and track job openings, while giving recruiters a complete dashboard to post jobs and review applicants.

---

## 🔗 Live Links

* **Live Deployment (Vercel):** [https://globalco-career-portal.vercel.app](https://globalco-career-portal.vercel.app) *(Replace with your live link)*
* **GitHub Repository:** [https://github.com/adityabhawsar221/globalco-career-portal](https://github.com/adityabhawsar221/globalco-career-portal)

---

## 📋 Assessment Submission Overview

* **Applicant Name:** Aditya Bhawsar
* **Role Applied:** Software Developer (Onsite - Hyderabad, India)
* **Target Company:** GlobalCo
* **Evaluator:** Rafael Amancio (Administrative Assistant)
* **Core Stack:** MongoDB, Express.js, React 18, Node.js (MERN), Vite, GitHub Actions CI/CD, Vercel

---

## 🌟 Business Value & Key Features


```

┌──────────────────────────────────────────────────────────────────────────┐
│                         GLOBALCO TALENT HUB                              │
├────────────────────────────────────┬─────────────────────────────────────┤
│        Candidate Experience        │         HR & Hiring Team            │
│  • Browse GlobalCo Openings        │  • Live Hiring Metrics Hub          │
│  • Tech Stack & Location Filters   │  • Candidate Pipeline ATS           │
│  • 1-Click Application Flow        │  • Stage Transitions (Shortlist)    │
│  • Real-Time Application Tracking  │  • Publish GlobalCo Job Openings    │
│  • Saved Bookmarks & Dark Mode     │  • Database Seed Reset & Analytics  │
└────────────────────────────────────┴─────────────────────────────────────┘

```

### 1. 🔍 Candidate Experience
* **Live Search & Filters:** Filter jobs by title, skills (`React`, `Node.js`, `Python`, `MongoDB`), work style (`📍 Hyderabad Onsite`, `🏢 Hybrid`, `🌐 Remote`), and minimum salary.
* **Featured Roles:** Highlights priority openings like **Software Developer (Onsite - Hyderabad)** with transparent salary ranges (₹12L - ₹20L INR) and company perks.
* **Quick Application:** Submit contact information, GitHub/portfolio links, and a cover letter in a single modal.
* **Application Tracker:** Check application status directly inside the "My Applications" tab (`Applied` ➔ `Shortlisted` ➔ `Selected` / `Archived`).
* **Bookmarks & Theme Toggle:** Save jobs locally to review later and switch between dark and light themes.

### 2. 🏢 HR & Recruiter Tools
* **Talent Acquisition Dashboard:** View live recruitment stats including active job count, received applications, and hiring pipeline metrics.
* **Applicant Tracking System (ATS):** Review candidate credentials, experience, and contact links with 1-click status actions (`Shortlist`, `Select`, `Reject`).
* **Job Management:** Create and publish new internal job requisitions with required skill tags and salary bounds.
* **Reliable Data Engine:** Direct MongoDB Atlas integration with an automated in-memory database fallback to ensure zero downtime during review.

---

## 🏗️ Technical Architecture


```

```
                             ┌─────────────────────────────────────┐
                             │       React 18 + Vite Frontend      │
                             │ (Glassmorphic CSS, JobContext State)│
                             └──────────────────┬──────────────────┘
                                                │
                                                │ REST API Requests (/api/*)
                                                ▼
                             ┌─────────────────────────────────────┐
                             │     Express.js API Engine (Node.js) │
                             │   (JWT Auth, Validation, Handlers)  │
                             └──────────────────┬──────────────────┘
                                                │
                         ┌──────────────────────┴──────────────────────┐
                         ▼                                             ▼
             ┌───────────────────────┐                     ┌───────────────────────┐
             │     MongoDB Atlas     │                     │ In-Memory Fallback DB │
             │ (Mongoose Schemas/DB) │                     │ (Zero-Config Resilience)│
             └───────────────────────┘                     └───────────────────────┘

```

```

---

## 🔄 CI/CD Pipeline & Deployment Flow

The project uses an automated GitHub Actions CI/CD pipeline configured in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml):


```

[Developer Push / PR to 'main']
│
▼
┌─────────────────────────────────────────────────┐
│          JOB 1: Continuous Integration (CI)     │
│  1. Checkout repository code                    │
│  2. Setup Node.js v20 environment               │
│  3. Install backend dependencies (npm ci)       │
│  4. Run automated unit test suite (npm test)    │
│  5. Install frontend dependencies (npm ci)      │
│  6. Build production bundle (Vite build)        │
│  7. Verify build output integrity               │
└────────────────────────┬────────────────────────┘
│ (On Success & Push to main)
▼
┌─────────────────────────────────────────────────┐
│          JOB 2: Continuous Deployment (CD)      │
│  1. Authenticate with Vercel API                │
│  2. Deploy Serverless Backend & Static Frontend │
│  3. Output Production URL                       │
└─────────────────────────────────────────────────┘

```

---

## 🚀 Step-by-Step Setup & Deployment

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: complete GlobalCo technical assessment"
git branch -M main
git remote add origin [https://github.com/adityabhawsar221/globalco-career-portal.git](https://github.com/adityabhawsar221/globalco-career-portal.git)
git push -u origin main

```

### Step 2: Deploy to Vercel

1. Open the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." ➔ "Project"**.
2. Select and import the `globalco-career-portal` repository.
3. Keep Framework preset as **Other** (Vercel automatically detects [`vercel.json`](https://www.google.com/search?q=vercel.json)).
4. *(Optional)* Add environment variables under **Settings**:
* `MONGODB_URI`: Your MongoDB Atlas connection string.
* `JWT_SECRET`: Any secure random key.


5. Click **Deploy**. Vercel will build both the frontend and API serverless routes automatically.

### Step 3: Configure GitHub Actions Secrets

To run deployment directly through GitHub Actions:

1. In your GitHub repository, navigate to **Settings ➔ Secrets and variables ➔ Actions**.
2. Add these repository secrets:
* `VERCEL_TOKEN`: Found in Vercel Account Settings ➔ Tokens.
* `VERCEL_ORG_ID`: Found in `.vercel/project.json` or team settings.
* `VERCEL_PROJECT_ID`: Found in `.vercel/project.json` or project settings.



---

## 🛠️ Local Development & Testing

### 1. Prerequisites

* **Node.js:** v18.x or v20.x
* **npm:** v9.x or higher

### 2. Start Backend & Frontend

```bash
# Terminal 1 - Backend Server (Port 5000)
cd backend
npm install
npm run dev

# Terminal 2 - Frontend Client (Port 3000)
cd frontend
npm install
npm run dev

```

### 3. Run Automated Tests

```bash
cd backend
npm test

```

Expected output:

```text
TAP version 13
# Subtest: hashPassword creates a hash that can be verified
ok 1 - hashPassword creates a hash that can be verified
# Subtest: register and application status workflow works for candidate and recruiter
ok 2 - register and application status workflow works for candidate and recruiter
1..2
# tests 2
# pass 2
# fail 0

```

---

## 🔑 Demo Access Accounts

Use these pre-configured test accounts to review both candidate and recruiter interfaces:

| Role | Username | Password | Purpose |
| --- | --- | --- | --- |
| **Candidate** | `candidate` | `candidate123` | Apply to jobs and track application progress |
| **HR Recruiter** | `recruiter` | `recruiter123` | Manage ATS board, update statuses, and post jobs |
| **Guest** | *(None)* | *(None)* | Explore public job listings without logging in |

---

## 📡 REST API Reference

| Endpoint | Method | Auth Required | Description |
| --- | --- | --- | --- |
| `/api/health` | `GET` | None (Public) | Check server uptime and database status |
| `/api/auth/register` | `POST` | None (Public) | Register a new candidate or recruiter account |
| `/api/auth/login` | `POST` | None (Public) | Authenticate user and return a JWT token |
| `/api/jobs` | `GET` | None (Public) | Search and filter job listings |
| `/api/jobs/:id` | `GET` | None (Public) | Get full details for a specific opening |
| `/api/jobs` | `POST` | Recruiter (Bearer) | Create and publish a new job listing |
| `/api/applications` | `POST` | Candidate (Bearer) | Submit an application for an opening |
| `/api/applications` | `GET` | Recruiter (Bearer) | Retrieve all candidate applications |
| `/api/applications/me` | `GET` | Candidate (Bearer) | Get applications for the logged-in candidate |
| `/api/applications/:id/status` | `PATCH` | Recruiter (Bearer) | Update candidate status (`Shortlisted`, `Selected`, `Rejected`) |
| `/api/stats` | `GET` | None (Public) | Fetch live recruitment metrics for the dashboard |
| `/api/seed` | `POST` | Admin/Bearer | Reset database to default sample dataset |

---

## 📁 Repository Structure

```text
jobs-board/
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions Automated CI/CD Workflow
├── backend/                  # Express.js REST API Server
│   ├── models/               # Mongoose Schemas (Job, Application, User)
│   ├── services/             # Auth & Database business logic
│   ├── test/                 # Automated unit and integration tests
│   ├── db.js                 # DB connection with MongoDB + Fallback
│   ├── index.js              # Express app entry & route handlers
│   ├── seedData.js           # GlobalCo initial data
│   └── package.json          # Backend dependencies & test scripts
├── frontend/                 # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── components/       # UI Components (Hero, Navbar, Modals, ATS)
│   │   ├── context/          # JobContext (State Management & API integration)
│   │   ├── index.css         # Styling system & dark/light mode
│   │   ├── App.jsx           # Main application router/view manager
│   │   └── main.jsx          # React entry point
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite proxy & build configuration
│   └── package.json          # Frontend dependencies
├── vercel.json               # Serverless build & API routing configuration
├── package.json              # Root workspace scripts
└── README.md                 # Complete project documentation

```

---

## 📬 Contact & Submission Details

* **Candidate:** Aditya Bhawsar
* **Position:** Software Developer (Onsite - Hyderabad)
* **Recipient:** Rafael Amancio (Administrative Assistant)
* **Company:** GlobalCo

*Thank you for reviewing this assessment submission. I look forward to your feedback!*

```

```
