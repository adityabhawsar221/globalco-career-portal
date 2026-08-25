import React, { useState, useEffect } from "react";
import { X, Save, Building2, DollarSign } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function EditJobModal() {
  const { editJobModal, setEditJobModal, updateJob } = useJobContext();

  const [formData, setFormData] = useState({
    title: "",
    company: "GlobalCo",
    location: "",
    locationType: "Onsite",
    category: "Software Development",
    jobType: "Full-Time",
    experienceLevel: "Mid Level",
    salaryMin: "1200000",
    salaryMax: "2000000",
    tags: "",
    description: "",
    requirements: "",
    perks: "",
    featured: false,
    urgent: false,
    employerEmail: "careers@globalco.com"
  });

  useEffect(() => {
    if (editJobModal) {
      setFormData({
        title: editJobModal.title || "",
        company: editJobModal.company || "GlobalCo",
        location: editJobModal.location || "",
        locationType: editJobModal.locationType || "Onsite",
        category: editJobModal.category || "Software Development",
        jobType: editJobModal.jobType || "Full-Time",
        experienceLevel: editJobModal.experienceLevel || "Mid Level",
        salaryMin: String(editJobModal.salaryMin || ""),
        salaryMax: String(editJobModal.salaryMax || ""),
        tags: Array.isArray(editJobModal.tags) ? editJobModal.tags.join(", ") : (editJobModal.tags || ""),
        description: editJobModal.description || "",
        requirements: Array.isArray(editJobModal.requirements) ? editJobModal.requirements.join("\n") : (editJobModal.requirements || ""),
        perks: Array.isArray(editJobModal.perks) ? editJobModal.perks.join("\n") : (editJobModal.perks || ""),
        featured: Boolean(editJobModal.featured),
        urgent: Boolean(editJobModal.urgent),
        employerEmail: editJobModal.employerEmail || "careers@globalco.com"
      });
    }
  }, [editJobModal]);

  const [submitting, setSubmitting] = useState(false);

  if (!editJobModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.description) return;

    setSubmitting(true);
    await updateJob(editJobModal.id, formData);
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setEditJobModal(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "760px" }}>
        <button className="modal-close-btn" onClick={() => setEditJobModal(null)}>
          <X size={20} />
        </button>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ffffff", padding: "0.35rem 0.75rem", borderRadius: "10px", border: "1px solid var(--border-color)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", marginBottom: "0.6rem" }}>
            <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "20px", objectFit: "contain" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>• Recruiter Tools</span>
          </div>
          <h2 style={{ fontSize: "1.5rem" }}>Edit Job Requisition</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Update opening details, salary benchmarks, and technical requirements for {formData.title}.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Job Title *</label>
              <input
                type="text"
                className="form-control"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Role Category *</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Software Development">Software Development</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Engineering Management">Engineering Management</option>
                <option value="Quality Engineering">Quality Engineering</option>
                <option value="Product & UI/UX">Product & UI/UX</option>
              </select>
            </div>

            <div className="form-group">
              <label>Workplace Setup *</label>
              <select
                className="form-control"
                value={formData.locationType}
                onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
              >
                <option value="Onsite">📍 Hyderabad Onsite</option>
                <option value="Hybrid">🏢 Hybrid</option>
                <option value="Remote">🌐 Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label>Office Location *</label>
              <input
                type="text"
                className="form-control"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Employment Type *</label>
              <select
                className="form-control"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Min Annual Salary (INR) *</label>
              <input
                type="number"
                className="form-control"
                required
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Max Annual Salary (INR) *</label>
              <input
                type="number"
                className="form-control"
                required
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Required Skill Tags (comma separated) *</label>
              <input
                type="text"
                className="form-control"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Job Description *</label>
              <textarea
                className="form-control"
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label>Key Requirements (one per line)</label>
              <textarea
                className="form-control"
                rows={4}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label>Benefits & Perks (one per line)</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.perks}
                onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group full-width" style={{ display: "flex", gap: "2rem" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span>⭐ Feature this job</span>
              </label>

              <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.urgent}
                  onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                />
                <span>🔥 Mark as Urgent Hiring</span>
              </label>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" className="btn-secondary" onClick={() => setEditJobModal(null)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              <Save size={16} />
              <span>{submitting ? "Saving Changes..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
