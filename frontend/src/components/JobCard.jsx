import React from "react";
import { MapPin, Briefcase, Bookmark, ChevronRight, Users, Clock, Edit3 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function JobCard({ job }) {
  const { savedJobIds, toggleSaveJob, setSelectedJobModal, setApplyJobModal, setEditJobModal, user } = useJobContext();

  const isSaved = savedJobIds.includes(job.id);
  const isRecruiter = user?.role === "recruiter";

  const formatSalaryRange = (min, max) => {
    if (!min && !max) return "Competitive Compensation";
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L / yr`;
  };

  const getRelativeTime = (dateStr) => {
    const diffDays = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className={`job-card ${job.featured ? "featured-card" : ""}`}>
      <div className="job-header-row">
        <div className="company-logo" style={{ background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.3rem", borderRadius: "12px", border: "1px solid var(--border-color)", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <img src={job.companyLogo || "/globalco-logo.png"} alt="GlobalCo Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>

        <div className="job-main-info">
          <div className="job-title-line">
            <h3 className="job-title">{job.title}</h3>
            {job.featured && <span className="badge badge-featured">Priority Role</span>}
            {job.urgent && <span className="badge badge-urgent">Urgent Hiring</span>}
          </div>

          <div className="company-name" style={{ color: "var(--accent-primary)", fontWeight: "600", fontSize: "0.85rem" }}>
            {job.category} • {job.locationType || "Onsite"}
          </div>

          <div className="job-meta-row">
            <div className="job-meta-item">
              <MapPin size={14} />
              <span>{job.location}</span>
            </div>

            <div className="job-meta-item">
              <Briefcase size={14} />
              <span>{job.jobType}</span>
            </div>

            <div className="job-meta-item">
              <Users size={14} />
              <span>{job.applicationCount || 0} candidates applied</span>
            </div>

            <div className="job-meta-item">
              <Clock size={14} />
              <span>{getRelativeTime(job.postedAt)}</span>
            </div>
          </div>
        </div>

        {!isRecruiter && (
          <button
            className={`bookmark-btn ${isSaved ? "saved" : ""}`}
            onClick={() => toggleSaveJob(job.id)}
            title={isSaved ? "Remove from saved bookmarks" : "Save this GlobalCo position"}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        )}
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="tags-row">
          {job.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="job-footer-row">
        <div className="salary-text">{formatSalaryRange(job.salaryMin, job.salaryMax)}</div>

        <div className="job-actions">
          <button className="btn-secondary" onClick={() => setSelectedJobModal(job)}>
            <span>View Details</span>
            <ChevronRight size={16} />
          </button>
          
          {isRecruiter ? (
            <button className="btn-primary" onClick={() => setEditJobModal(job)}>
              <Edit3 size={15} />
              <span>Edit Opening</span>
            </button>
          ) : (
            <button className="btn-primary" onClick={() => setApplyJobModal(job)}>
              <span>Apply Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
