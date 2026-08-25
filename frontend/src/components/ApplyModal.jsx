import React, { useState, useEffect } from "react";
import { X, Send, User, Mail, Phone, Link2, FileText, Building2 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function ApplyModal() {
  const { applyJobModal, setApplyJobModal, submitApplication, user } = useJobContext();

  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    experienceYears: "2",
    portfolioUrl: "",
    coverLetter: ""
  });

  useEffect(() => {
    if (applyJobModal) {
      setFormData((prev) => ({
        ...prev,
        applicantName: user?.name || prev.applicantName || "",
        applicantEmail: user?.email || prev.applicantEmail || "",
        applicantPhone: prev.applicantPhone || "",
        portfolioUrl: prev.portfolioUrl || "",
        coverLetter: prev.coverLetter || `Dear Hiring Team,\n\nI am applying for the ${applyJobModal.title} position at GlobalCo. I have hands-on experience in full-stack web development and software engineering, and I am excited about contributing to GlobalCo's engineering team.`
      }));
    }
  }, [user, applyJobModal]);

  const [submitting, setSubmitting] = useState(false);

  if (!applyJobModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.applicantEmail || !formData.coverLetter) {
      return;
    }
    setSubmitting(true);
    const success = await submitApplication({
      jobId: applyJobModal.id,
      jobTitle: applyJobModal.title,
      company: applyJobModal.company || "GlobalCo",
      ...formData
    });
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setApplyJobModal(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setApplyJobModal(null)}>
          <X size={20} />
        </button>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ffffff", padding: "0.35rem 0.75rem", borderRadius: "10px", border: "1px solid var(--border-color)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", marginBottom: "0.6rem" }}>
            <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "20px", objectFit: "contain" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>• Official Application</span>
          </div>
          <h2 style={{ fontSize: "1.4rem" }}>Apply for {applyJobModal.title}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{applyJobModal.category} • {applyJobModal.location}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Aditya Bhawsar"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                required
                value={formData.applicantEmail}
                onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone / WhatsApp Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="e.g. +91 98765 00000"
                value={formData.applicantPhone}
                onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Years of Relevant Experience</label>
              <select
                className="form-control"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              >
                <option value="0">Fresh Graduate / 0-1 years</option>
                <option value="2">2 - 3 years</option>
                <option value="4">3 - 5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>GitHub Profile / Portfolio / Project URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="https://github.com/your-username"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Candidate Cover Letter & Technical Pitch *</label>
              <textarea
                className="form-control"
                placeholder="Explain why you are an ideal fit for this position..."
                required
                rows={5}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
            <button type="button" className="btn-secondary" onClick={() => setApplyJobModal(null)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              <Send size={16} />
              <span>{submitting ? "Submitting Application..." : "Submit Application"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
