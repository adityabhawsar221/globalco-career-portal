import React from "react";
import { Briefcase, FileText, CheckCircle2, XCircle, Clock3, User, Mail, MapPin, Sparkles } from "lucide-react";
import { useJobContext } from "../context/JobContext";

const statusStyles = {
  Applied: { bg: "var(--accent-light)", color: "var(--accent-primary)" },
  Shortlisted: { bg: "var(--warning-light)", color: "var(--warning)" },
  Rejected: { bg: "var(--danger-light)", color: "var(--danger)" },
  Selected: { bg: "var(--success-light)", color: "var(--success)" }
};

export default function ProfileView() {
  const { user, myApplications, setCurrentView } = useJobContext();

  const candidateName = user?.name || "Aditya Bhawsar";
  const candidateEmail = user?.email || "aditya@example.com";
  const candidateUsername = user?.username || "aditya";
  const candidateRole = user?.role === "recruiter" ? "HR Recruiter" : "Applicant (Candidate)";

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1rem", width: "100%" }}>
      {/* Top Grid: Profile Info & Application Status */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* Candidate Profile Details Card */}
        <div className="stat-card" style={{ padding: "1.8rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--accent-gradient)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "1.4rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
              >
                {candidateName.charAt(0).toUpperCase()}
              </div>
              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em" }}>
                  Candidate Profile
                </span>
                <h2 style={{ margin: 0, fontSize: "1.35rem", lineHeight: "1.2" }}>{candidateName}</h2>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Username</span>
                <strong style={{ fontSize: "0.92rem" }}>{candidateUsername}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Account Role</span>
                <span className="badge" style={{ background: "var(--accent-light)", color: "var(--accent-primary)", fontWeight: "700" }}>
                  {candidateRole}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Registered Email</span>
                <strong style={{ fontSize: "0.9rem" }}>{candidateEmail}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Primary Location</span>
                <strong style={{ fontSize: "0.9rem" }}>Hyderabad, India</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Application Statistics Card */}
        <div className="stat-card" style={{ padding: "1.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
            <FileText size={20} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Application Status Overview</h3>
          </div>

          <div className="stats-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
            <div className="stat-card" style={{ padding: "1.1rem" }}>
              <div className="stat-value">{myApplications.length}</div>
              <div className="stat-label">Total Applied</div>
            </div>
            <div className="stat-card" style={{ padding: "1.1rem" }}>
              <div className="stat-value" style={{ color: "var(--warning)" }}>
                {myApplications.filter((app) => app.status === "Shortlisted").length}
              </div>
              <div className="stat-label">Shortlisted</div>
            </div>
            <div className="stat-card" style={{ padding: "1.1rem" }}>
              <div className="stat-value" style={{ color: "var(--success)" }}>
                {myApplications.filter((app) => app.status === "Selected").length}
              </div>
              <div className="stat-label">Selected</div>
            </div>
            <div className="stat-card" style={{ padding: "1.1rem" }}>
              <div className="stat-value" style={{ color: "var(--danger)" }}>
                {myApplications.filter((app) => app.status === "Rejected").length}
              </div>
              <div className="stat-label">Archived / Closed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Applications Table */}
      <div style={{ marginTop: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ fontSize: "1.3rem", margin: 0 }}>My Submitted Applications</h2>
          <button className="btn-secondary" style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }} onClick={() => setCurrentView("jobs")}>
            <Briefcase size={15} />
            <span>Browse More Openings</span>
          </button>
        </div>

        {myApplications.length === 0 ? (
          <div className="empty-state">
            <Clock3 size={36} style={{ marginBottom: "1rem" }} />
            <h3>No applications submitted yet</h3>
            <p>Explore open positions and submit your application to track your review process in real time.</p>
            <button className="btn-primary" style={{ marginTop: "1.2rem" }} onClick={() => setCurrentView("jobs")}>
              Browse Open Positions
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Position Applied</th>
                  <th>Department / Location</th>
                  <th>Application Status</th>
                  <th>Submission Date</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>{app.jobTitle}</div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                      Hyderabad, India (Onsite)
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: statusStyles[app.status]?.bg || "var(--accent-light)",
                          color: statusStyles[app.status]?.color || "var(--accent-primary)",
                          fontWeight: "700"
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                      {new Date(app.appliedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
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
