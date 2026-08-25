import React, { useState } from "react";
import { X, PlusCircle, Building, DollarSign, Building2 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function PostJobModal() {
  const { isPostJobOpen, setIsPostJobOpen, createJob } = useJobContext();

  const [formData, setFormData] = useState({
    title: "Software Developer",
    company: "GlobalCo",
    companyLogo: "",
    location: "Hyderabad, India (Onsite)",
    locationType: "Onsite",
    category: "Software Development",
    jobType: "Full-Time",
    experienceLevel: "Mid Level",
    salaryMin: "1200000",
    salaryMax: "2000000",
    tags: "React, Node.js, Express, MongoDB, CI/CD, Git, Vercel, JavaScript",
    description: "GlobalCo is hiring a Software Developer (Onsite) for our Hyderabad, India team. You will be responsible for building responsive web applications, developing scalable REST APIs, setting up automated CI/CD pipelines, and collaborating with cross-functional engineering teams.",
    requirements: "2+ years of full-stack web development experience with React and Node.js\nHands-on experience with Git version control, CI/CD pipelines, and cloud deployments\nSolid understanding of RESTful API architecture and MongoDB\nGood problem-solving ability and clean code standards\nWillingness to work onsite at our Hyderabad office",
    perks: "Competitive compensation and performance bonuses\nComprehensive health insurance for employee and dependents\nAnnual learning, upskilling, and certification allowance\nModern engineering equipment and ergonomic workspace\nMentorship and rapid career progression in a growing tech team",
    featured: true,
    urgent: true,
    employerEmail: "careers@globalco.com"
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isPostJobOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.description) return;

    setSubmitting(true);
    const success = await createJob(formData);
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPostJobOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "760px" }}>
        <button className="modal-close-btn" onClick={() => setIsPostJobOpen(false)}>
          <X size={20} />
        </button>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ffffff", padding: "0.35rem 0.75rem", borderRadius: "10px", border: "1px solid var(--border-color)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", marginBottom: "0.6rem" }}>
            <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "20px", objectFit: "contain" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>• HR Portal</span>
          </div>
          <h2 style={{ fontSize: "1.5rem" }}>Publish a New GlobalCo Opening</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Create and publish internal job requisitions to attract engineering talent to GlobalCo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Role Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Software Developer (Onsite)"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Company Entity *</label>
              <input
                type="text"
                className="form-control"
                placeholder="GlobalCo"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Location & Work Model *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Hyderabad, India (Onsite)"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>HR Contact / Notification Email *</label>
              <input
                type="email"
                className="form-control"
                placeholder="careers@globalco.com"
                required
                value={formData.employerEmail}
                onChange={(e) => setFormData({ ...formData, employerEmail: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Workplace Type</label>
              <select
                className="form-control"
                value={formData.locationType}
                onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
              >
                <option value="Onsite">Onsite (Hyderabad)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department / Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Software Development">Software Development</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Product & Design">Product & Design</option>
              </select>
            </div>

            <div className="form-group">
              <label>Employment Type</label>
              <select
                className="form-control"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>

            <div className="form-group">
              <label>Experience Level</label>
              <select
                className="form-control"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Leadership">Leadership</option>
              </select>
            </div>

            <div className="form-group">
              <label>Min Annual Salary (INR) *</label>
              <input
                type="number"
                className="form-control"
                placeholder="1200000"
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
                placeholder="2000000"
                required
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Required Tech Skills & Keywords (comma separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="React, Node.js, Express, MongoDB, CI/CD, Git, Vercel, JavaScript"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label>Role Description & Responsibilities *</label>
              <textarea
                className="form-control"
                placeholder="Detailed description of responsibilities, team structure, and projects at Globalco..."
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label>Key Requirements (one per line)</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group full-width">
              <label>Globalco Benefits & Perks (one per line)</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.perks}
                onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group full-width" style={{ flexDirection: "row", gap: "1.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span>Highlight as Priority / Featured Role</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.urgent}
                  onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                />
                <span>Mark as Urgent Hiring</span>
              </label>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="button" className="btn-secondary" onClick={() => setIsPostJobOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              <PlusCircle size={16} />
              <span>{submitting ? "Publishing Role..." : "Publish GlobalCo Opening"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

