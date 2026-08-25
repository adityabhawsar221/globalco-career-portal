import React from "react";
import { Search, MapPin, Sparkles, Building2 } from "lucide-react";
import { useJobContext } from "../context/JobContext";

const categories = ["All", "Software Development", "DevOps & Cloud", "Data & AI", "Quality Assurance", "Product & Design"];

export default function HeroSearch() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useJobContext();

  return (
    <section className="hero-section">
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#ffffff", padding: "0.45rem 1.2rem", borderRadius: "30px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", marginBottom: "1.2rem" }}>
        <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "22px", objectFit: "contain" }} />
        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#002b66" }}>• Official Career Portal</span>
      </div>

      <h1 className="hero-title">
        Build the Future With Us at <br />
        <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          GlobalCo
        </span>
      </h1>

      <p className="hero-subtitle">
        Explore engineering and technology opportunities across our Hyderabad development center, regional offices, and remote teams.
      </p>

      <div className="search-box-wrapper">
        <div className="search-input-group">
          <Search size={20} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search role (e.g. Software Developer, React, Node.js, CI/CD, Python) or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}

