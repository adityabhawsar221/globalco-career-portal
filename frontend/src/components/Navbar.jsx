import React from "react";
import { Briefcase, PlusCircle, LayoutDashboard, Bookmark, Sun, Moon, LogOut, UserCheck } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    currentView,
    setCurrentView,
    savedJobIds,
    setIsPostJobOpen,
    user,
    logoutUser
  } = useJobContext();

  const isRecruiter = user?.role === "recruiter";

  return (
    <header className="navbar">
      {/* Brand Logo - clean without redundant text since logo image has GLOBALCO */}
      <div className="logo" onClick={() => setCurrentView("jobs")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{ background: "#ffffff", padding: "0.4rem 0.85rem", borderRadius: "12px", display: "flex", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <img src="/globalco-logo.png" alt="GlobalCo" style={{ height: "28px", objectFit: "contain" }} />
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", borderLeft: "2px solid var(--border-color)", paddingLeft: "0.85rem" }}>
          Careers Portal
        </span>
      </div>

      <nav className="nav-actions">
        <button
          className={`nav-link-btn ${currentView === "jobs" ? "active" : ""}`}
          onClick={() => setCurrentView("jobs")}
        >
          <Briefcase size={18} />
          <span>Open Positions</span>
        </button>

        {!isRecruiter && (
          <button
            className={`nav-link-btn ${currentView === "profile" ? "active" : ""}`}
            onClick={() => setCurrentView("profile")}
          >
            <UserCheck size={18} />
            <span>My Applications</span>
          </button>
        )}

        {isRecruiter && (
          <button
            className={`nav-link-btn ${currentView === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentView("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>HR Hiring Hub</span>
          </button>
        )}

        <button
          className={`nav-link-btn ${currentView === "saved" ? "active" : ""}`}
          onClick={() => setCurrentView("saved")}
        >
          <Bookmark size={18} />
          <span>Saved</span>
          {savedJobIds.length > 0 && (
            <span
              style={{
                background: "var(--accent-primary)",
                color: "white",
                borderRadius: "10px",
                padding: "2px 8px",
                fontSize: "0.75rem",
                fontWeight: "700"
              }}
            >
              {savedJobIds.length}
            </span>
          )}
        </button>

        {isRecruiter && (
          <button className="btn-primary" onClick={() => setIsPostJobOpen(true)}>
            <PlusCircle size={18} />
            <span>Post Opening</span>
          </button>
        )}

        <div className="user-badge">
          <span className="user-role">{user?.role === "recruiter" ? "HR Recruiter" : "Candidate"}</span>
          <span className="user-name">{user?.name || "Aditya Bhawsar"}</span>
        </div>

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {user && (
          <button
            className="theme-toggle-btn"
            onClick={logoutUser}
            title="Sign out of your session"
          >
            <LogOut size={18} />
          </button>
        )}
      </nav>
    </header>
  );
}
