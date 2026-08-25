# 🏢 GlobalCo — Official Career & Talent Portal

![Node.js](https://img.shields.io/badge/Node.js-v20-green?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Express](https://img.shields.io/badge/Express-4.19-lightgray?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?style=flat-square&logo=githubactions)
![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)
![Status](https://img.shields.io/badge/Assessment-Software%20Developer%20(Onsite%20Hyderabad)-purple?style=flat-square)

The **GlobalCo Career & Talent Portal** is a production-grade, full-stack recruitment platform designed and built for **GlobalCo**. It enables top engineering talent to explore career opportunities, submit structured applications, and track their recruitment journey, while providing GlobalCo's talent acquisition team with an end-to-end hiring management hub.

---

## 📋 Assessment Submission Overview

- **Applicant Name**: Aditya Bhawsar
- **Position Applied**: Software Developer (Onsite - Hyderabad, India)
- **Company**: GlobalCo
- **Assessment Evaluator**: Rafael Amancio (Office Staff / Administrative Assistant)
- **Tech Stack**: MERN (MongoDB, Express.js, React 18, Node.js), Vite, GitHub Actions CI/CD, Vercel Serverless

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

### 1. 🔍 For Candidates & Engineers
- **Live Search & Multi-Filters**: Instant search across role titles, technical skills (`React`, `Node.js`, `CI/CD`, `Python`, `MongoDB`), workplace type (`📍 Hyderabad Onsite`, `🏢 Hybrid`, `🌐 Remote`), and minimum CTC ranges in INR.
- **Featured Opening**: Highlights the priority **Software Developer (Onsite - Hyderabad)** opening with detailed requirements, tech stack, compensation bounds (₹12L - ₹20L INR), and comprehensive employee perks.
- **1-Click Application Modal**: Streamlined application form with pre-filled candidate details, GitHub/portfolio links, phone/WhatsApp number, and cover letter pitch.
- **Candidate Application Tracker**: Dedicated "My Applications" view showing submission history and real-time status badges (`Applied` ➔ `Shortlisted` ➔ `Selected` / `Archived`).
- **Bookmarks & Theme Switcher**: Save positions locally to review anytime, with dark/light mode toggle.

### 2. 🏢 For GlobalCo HR & Hiring Managers
- **Talent Acquisition Dashboard**: Real-time KPI metrics displaying active openings count, candidate applications received, remote/hybrid flexibility ratio, and priority openings.
- **Applicant Tracking System (ATS)**: Review applicant qualifications, experience years, contact details, and portfolio links with 1-click status actions (`Shortlist`, `Select`, `Reject`).
- **Publish GlobalCo Openings**: Multi-step modal to create and publish internal job requisitions with required tech skills, salary bounds, and perks.
- **Zero-Config Database Resilience**: Automated MongoDB Atlas connectivity with built-in in-memory fallback to ensure 100% uptime across all environments.

---

## 🏗️ Technical Architecture

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

---

## 🔄 CI/CD Pipeline & Automated Deployment Architecture

The repository includes a production-grade **GitHub Actions CI/CD Pipeline** defined in [`.github/workflows/ci-cd.yml`](file:///.github/workflows/ci-cd.yml).

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

## 🚀 Step-by-Step Git, CI/CD & Deployment Instructions

### 📌 Step 1: Push Code to Your GitHub Repository

1. Create a new repository on [GitHub](https://github.com/new) named `globalco-career-portal`.
2. Open your terminal in this project root folder and execute:
   ```bash
   git add .
   git commit -m "feat: update to GlobalCo branding and complete assessment"
   git branch -M main
   git remote add origin https://github.com/adityabhawsar221/globalco-career-portal.git
   git push -u origin main
   ```

---

### 📌 Step 2: Deploy to Vercel (Automatic CI/CD via GitHub Integration)

1. Navigate to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** ➔ **"Project"**.
3. Import your GitHub repository (`globalco-career-portal`).
4. Keep the Framework preset as **Other** (Vercel automatically detects [`vercel.json`](file:///vercel.json)).
5. *(Optional)* Under **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (if left blank, the app will seamlessly run in zero-config memory mode).
   - `JWT_SECRET`: Any secure random string.
6. Click **Deploy**.
   Vercel will build both the React frontend and Express serverless API endpoints within 1 minute!

---

### 📌 Step 3: Configure GitHub Actions CI/CD Secrets (Optional / Direct Action Deploy)

To enable GitHub Actions to deploy directly to Vercel upon each commit:
1. In your GitHub repository, go to **Settings ➔ Secrets and variables ➔ Actions**.
2. Add the following secrets:
   - `VERCEL_TOKEN`: Obtained from **Vercel Account Settings ➔ Tokens**.
   - `VERCEL_ORG_ID`: Found in your project `.vercel/project.json` or team settings.
   - `VERCEL_PROJECT_ID`: Found in your project `.vercel/project.json` or project settings.
3. Every push to `main` will now trigger automated testing and direct deployment!

---

## 🛠️ Local Development & Testing

### 1. Prerequisites
- **Node.js**: v18.0.0 or v20.x
- **npm**: v9.0.0 or higher

### 2. Run Backend & Frontend Concurrently
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
*Output:*
```
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

| Role | Username | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Candidate** | `candidate` | `candidate123` | Apply to openings & track candidate status |
| **HR Recruiter** | `recruiter` | `recruiter123` | Access ATS, shortlist candidates & post roles |
| **Guest** | *(No credentials required)* | Explore all GlobalCo positions instantly |

---

## 📡 REST API Reference

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Public | System health check and uptime status |
| `/api/auth/register` | `POST` | Public | Register new candidate or recruiter account |
| `/api/auth/login` | `POST` | Public | Authenticate user and generate JWT token |
| `/api/jobs` | `GET` | Public | Filter and search GlobalCo job openings |
| `/api/jobs/:id` | `GET` | Public | Retrieve detailed information for a specific job |
| `/api/jobs` | `POST` | Bearer | Publish a new GlobalCo job listing |
| `/api/applications` | `POST` | Bearer | Submit candidate application for a position |
| `/api/applications` | `GET` | Bearer | Fetch all applicant submissions for HR dashboard |
| `/api/applications/me` | `GET` | Bearer | Fetch candidate's own application history |
| `/api/applications/:id/status` | `PATCH` | Recruiter | Update candidate stage (`Shortlisted`, `Selected`, `Rejected`) |
| `/api/stats` | `GET` | Public | Fetch real-time hiring metrics and ratios |
| `/api/seed` | `POST` | Bearer | Reset database to default GlobalCo sample dataset |

---

## 📁 Repository Structure

```
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
│   │   ├── components/       # HeroSearch, Navbar, JobCard, Modals, Dashboard, Profile
│   │   ├── context/          # JobContext (State Management, Auth & API integration)
│   │   ├── index.css         # Glassmorphism design system & dark/light theme
│   │   ├── App.jsx           # Main application view manager
│   │   └── main.jsx          # React DOM mounting entry
│   ├── index.html            # HTML template with SEO meta tags
│   ├── vite.config.js        # Vite build & proxy configuration
│   └── package.json          # Frontend dependencies
├── vercel.json               # Root Vercel serverless build & routing configuration
├── package.json              # Root workspace scripts
└── README.md                 # Complete AI-generated technical documentation
```

---

## 📬 Contact & Submission Details

- **Candidate**: Aditya Bhawsar
- **Position**: Software Developer (Onsite - Hyderabad)
- **Recipient**: Rafael Amancio (Office Staff / Administrative Assistant)
- **Organization**: GlobalCo

*Thank you for reviewing this assessment submission. I look forward to the next steps!*
