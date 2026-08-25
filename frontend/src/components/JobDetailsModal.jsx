import React from "react";
import { X, MapPin, Briefcase, DollarSign, Calendar, Mail, CheckCircle2, ShieldCheck, Edit3 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function JobDetailsModal() {
  const { selectedJobModal, setSelectedJobModal, setApplyJobModal, setEditJobModal, user } = useJobContext();

  if (!selectedJobModal) return null;

  const job = selectedJobModal;
  const isRecruiter = user?.role === "recruiter";

  const handleActionClick = () => {
    if (isRecruiter) {
      setSelectedJobModal(null);
      setEditJobModal(job);
    } else {
      setApplyJobModal(job);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedJobModal(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setSelectedJobModal(null)}>
          <X size={20} />
        </button>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "120px",
              height: "54px",
              borderRadius: "12px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.4rem 0.6rem",
              border: "1px solid var(--border-color)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              flexShrink: 0
            }}
          >
            <img src={job.companyLogo || "/globalco-logo.png"} alt="GlobalCo Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.5rem" }}>{job.title}</h2>
            <p style={{ color: "var(--accent-primary)", fontWeight: "600", fontSize: "0.95rem" }}>{job.category} • {job.location}</p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.75rem",
            background: "var(--bg-primary)",
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            marginBottom: "1.5rem"
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Location</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{job.location}</span>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Workplace Type</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{job.locationType || "Onsite"}</span>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Employment</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{job.jobType}</span>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Experience</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{job.experienceLevel}</span>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Annual Salary</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--success)" }}>
              ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L INR
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Role Overview</h3>
          <p style={{ color: "var(--text-secondary)", whiteSpace: "pre-line", lineHeight: "1.7" }}>{job.description}</p>
        </div>

        {job.requirements && job.requirements.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Key Qualifications & Technical Skills</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {job.requirements.map((req, idx) => (
                <li key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", color: "var(--text-secondary)" }}>
                  <CheckCircle2 size={16} color="var(--accent-primary)" style={{ marginTop: "4px", flexShrink: 0 }} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.perks && job.perks.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>GlobalCo Perks & Employee Benefits</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {job.perks.map((perk, idx) => (
                <li key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", color: "var(--text-secondary)" }}>
                  <ShieldCheck size={16} color="var(--success)" style={{ marginTop: "4px", flexShrink: 0 }} />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Mail size={15} />
            <span>Hiring Contact: {job.employerEmail || "careers@globalco.com"} (GlobalCo Talent Team)</span>
          </div>
          <button className="btn-primary" onClick={handleActionClick}>
            {isRecruiter ? (
              <>
                <Edit3 size={16} />
                <span>Edit Job Requisition</span>
              </>
            ) : (
              <span>Apply for this Position</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
