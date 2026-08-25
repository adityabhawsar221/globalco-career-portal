import React from "react";
import { JobProvider, useJobContext } from "./context/JobContext";
import Navbar from "./components/Navbar";
import HeroSearch from "./components/HeroSearch";
import FilterSidebar from "./components/FilterSidebar";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import ApplyModal from "./components/ApplyModal";
import PostJobModal from "./components/PostJobModal";
import EditJobModal from "./components/EditJobModal";
import DashboardView from "./components/DashboardView";
import ProfileView from "./components/ProfileView";
import LoginPage from "./components/LoginPage";
import { Briefcase, Bookmark, AlertCircle, CheckCircle } from "lucide-react";

function MainAppContent() {
  const {
    jobs,
    loading,
    error,
    currentView,
    savedJobIds,
    toastMessage,
    user
  } = useJobContext();

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="app-container">
      <Navbar />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 999,
            background: toastMessage.type === "error" ? "var(--danger)" : "var(--accent-primary)",
            color: "white",
            padding: "0.85rem 1.4rem",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: "600",
            animation: "slideUp 0.3s ease"
          }}
        >
          {toastMessage.type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {currentView === "dashboard" ? (
        <DashboardView />
      ) : currentView === "profile" ? (
        <ProfileView />
      ) : (
        <>
          {currentView === "jobs" && <HeroSearch />}

          <main className="main-content">
            {currentView === "jobs" && <FilterSidebar />}

            <section style={{ gridColumn: currentView === "saved" ? "1 / -1" : "auto" }}>
              <div className="jobs-feed-header">
                <div>
                  <h2 style={{ fontSize: "1.4rem" }}>
                    {currentView === "saved" ? "Bookmarked Positions" : "GlobalCo Open Positions"}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    Showing {currentView === "saved" ? savedJobs.length : jobs.length} open roles at GlobalCo
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="empty-state">
                  <div className="stat-icon" style={{ margin: "0 auto 1rem auto" }}>
                    <Briefcase size={28} />
                  </div>
                  <h3>Loading GlobalCo job listings...</h3>
                </div>
              ) : error ? (
                <div className="empty-state">
                  <AlertCircle size={36} color="var(--danger)" style={{ marginBottom: "1rem" }} />
                  <h3>Unable to load positions</h3>
                  <p>{error}</p>
                </div>
              ) : (currentView === "saved" ? savedJobs : jobs).length === 0 ? (
                <div className="empty-state">
                  {currentView === "saved" ? (
                    <>
                      <Bookmark size={40} style={{ marginBottom: "1rem" }} />
                      <h3>No saved positions yet</h3>
                      <p>Click the bookmark icon on any GlobalCo opening to save it for later review.</p>
                    </>
                  ) : (
                    <>
                      <Briefcase size={40} style={{ marginBottom: "1rem" }} />
                      <h3>No matching GlobalCo roles found</h3>
                      <p>Try adjusting your search criteria or resetting filters.</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="jobs-grid">
                  {(currentView === "saved" ? savedJobs : jobs).map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </>
      )}

      {/* Modals */}
      <JobDetailsModal />
      <ApplyModal />
      <PostJobModal />
      <EditJobModal />

      {/* Footer */}
      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--border-color)",
          padding: "2rem",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.85rem",
          background: "var(--bg-surface)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem"
        }}
      >
        <div style={{ background: "#ffffff", padding: "0.35rem 0.75rem", borderRadius: "10px", display: "inline-flex", alignItems: "center", border: "1px solid var(--border-color)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "24px", objectFit: "contain" }} />
        </div>
        <p>© 2026 GlobalCo • Official Career & Talent Portal | Hyderabad, India</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <JobProvider>
      <MainAppContent />
    </JobProvider>
  );
}
