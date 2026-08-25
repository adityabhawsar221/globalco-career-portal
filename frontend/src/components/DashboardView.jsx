import React from "react";
import { Briefcase, Users, Globe, Star, RotateCcw, ExternalLink, Building2 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function DashboardView() {
  const { stats, applications, jobs, showToast, fetchJobs, updateApplicationStatus } = useJobContext();

  const handleResetSeed = async () => {
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        showToast("Globalco database seed data refreshed!", "success");
        fetchJobs();
      }
    } catch {
      showToast("Failed to reseed Globalco database", "error");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "#ffffff", padding: "0.5rem 0.9rem", borderRadius: "14px", display: "flex", alignItems: "center", border: "1px solid var(--border-color)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "32px", objectFit: "contain" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.8rem" }}>Talent Acquisition & Hiring Hub</h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Live overview of open requisitions, applicant pipeline, candidate qualifications, and hiring status.
            </p>
          </div>
        </div>
        <button className="btn-secondary" onClick={handleResetSeed} title="Reset database to default sample listings">
          <RotateCcw size={16} />
          <span>Refresh Openings</span>
        </button>
      </div>

      {/* Metrics Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="stat-value">{stats.totalJobs || jobs.length}</div>
            <div className="stat-label">Active Openings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--success-light)", color: "var(--success)" }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-value">{stats.totalApplications || applications.length}</div>
            <div className="stat-label">Candidate Applications</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--warning-light)", color: "var(--warning)" }}>
            <Globe size={24} />
          </div>
          <div>
            <div className="stat-value">{stats.remotePercentage || 50}%</div>
            <div className="stat-label">Remote / Hybrid Flexibility</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--accent-light)", color: "var(--accent-primary)" }}>
            <Star size={24} />
          </div>
          <div>
            <div className="stat-value">{stats.featuredJobs || 0}</div>
            <div className="stat-label">Priority Openings</div>
          </div>
        </div>
      </div>

      {/* Applicant Submissions Table */}
      <div style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Recent Candidate Submissions</h2>

        {applications.length === 0 ? (
          <div className="empty-state">
            <Users size={40} style={{ marginBottom: "1rem" }} />
            <h3>No candidate applications submitted yet</h3>
            <p>Candidate applications submitted through the careers portal will appear here in real time.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position Applied</th>
                  <th>Experience</th>
                  <th>Contact Information</th>
                  <th>Portfolio / GitHub</th>
                  <th>Status Action</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div style={{ fontWeight: "700" }}>{app.applicantName}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: "600" }}>{app.jobTitle}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: "600" }}>Hyderabad (Onsite)</div>
                    </td>
                    <td>{app.experienceYears} Years</td>
                    <td>
                      <div style={{ fontSize: "0.85rem" }}>{app.applicantEmail}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{app.applicantPhone}</div>
                    </td>
                    <td>
                      {app.portfolioUrl ? (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}
                        >
                          <span>Portfolio / Git</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span style={{ color: "var(--text-muted)" }}>N/A</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                        <span
                          className="badge"
                          style={{
                            background: app.status === "Shortlisted" ? "var(--warning-light)" : app.status === "Rejected" ? "var(--danger-light)" : app.status === "Selected" ? "var(--success-light)" : "var(--accent-light)",
                            color: app.status === "Shortlisted" ? "var(--warning)" : app.status === "Rejected" ? "var(--danger)" : app.status === "Selected" ? "var(--success)" : "var(--accent-primary)"
                          }}
                        >
                          {app.status}
                        </span>
                        {app.status !== "Selected" && (
                          <button className="btn-secondary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.75rem", borderColor: "var(--success)" }} onClick={() => updateApplicationStatus(app.id, "Selected")}>
                            Select
                          </button>
                        )}
                        {app.status !== "Shortlisted" && (
                          <button className="btn-secondary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.75rem" }} onClick={() => updateApplicationStatus(app.id, "Shortlisted")}>
                            Shortlist
                          </button>
                        )}
                        {app.status !== "Rejected" && (
                          <button className="btn-secondary" style={{ padding: "0.35rem 0.7rem", fontSize: "0.75rem", borderColor: "var(--danger)" }} onClick={() => updateApplicationStatus(app.id, "Rejected")}>
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {new Date(app.appliedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

