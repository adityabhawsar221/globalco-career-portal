import React from "react";
import { Filter, RotateCcw, Building2 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

export default function FilterSidebar() {
  const {
    selectedLocationType,
    setSelectedLocationType,
    selectedJobType,
    setSelectedJobType,
    minSalary,
    setMinSalary,
    resetFilters
  } = useJobContext();

  const formatSalary = (val) => {
    if (val === 0) return "Any CTC";
    return `₹${(val / 100000).toFixed(1)} Lakhs+`;
  };

  return (
    <aside className="filters-sidebar">
      <div className="filter-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "700" }}>
          <Filter size={18} color="var(--accent-primary)" />
          <span>Role Filters</span>
        </div>
        <button className="reset-filter-btn" onClick={resetFilters} title="Reset all filters">
          <RotateCcw size={14} style={{ display: "inline", marginRight: "4px" }} />
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label>Workplace & Office Model</label>
        <select
          className="filter-select"
          value={selectedLocationType}
          onChange={(e) => setSelectedLocationType(e.target.value)}
        >
          <option value="All">All Workplace Types</option>
          <option value="Onsite">📍 Hyderabad (Onsite)</option>
          <option value="Hybrid">🏢 Hybrid Model</option>
          <option value="Remote">🌐 Remote (India / Global)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Employment Nature</label>
        <select
          className="filter-select"
          value={selectedJobType}
          onChange={(e) => setSelectedJobType(e.target.value)}
        >
          <option value="All">All Employment Types</option>
          <option value="Full-Time">Full-Time Permanent</option>
          <option value="Contract">Contract / Project</option>
          <option value="Internship">Graduate Internship</option>
          <option value="Part-Time">Part-Time</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Minimum Annual CTC (INR)</label>
        <input
          type="range"
          min="0"
          max="4000000"
          step="200000"
          value={minSalary}
          onChange={(e) => setMinSalary(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent-primary)" }}
        />
        <div className="salary-slider-value">
          <span>₹0</span>
          <span style={{ fontWeight: "700", color: "var(--accent-primary)" }}>{formatSalary(minSalary)}</span>
          <span>₹40L+</span>
        </div>
      </div>
    </aside>
  );
}

