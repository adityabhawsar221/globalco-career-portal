import React, { useState } from "react";
import { ArrowRight, Briefcase, Sparkles, UserRound, BriefcaseIcon, Building2, ShieldCheck } from "lucide-react";
import { useJobContext } from "../context/JobContext";

const roleDefaults = {
  candidate: {
    username: "candidate",
    label: "Candidate",
    description: "Explore openings & track application status"
  },
  recruiter: {
    username: "recruiter",
    label: "HR Recruiter",
    description: "Review applicants & manage hiring pipeline"
  },
  guest: {
    username: "guest",
    label: "Instant Access",
    description: "Browse all open positions directly"
  }
};

export default function LoginPage() {
  const { loginUser } = useJobContext();
  const [selectedRole, setSelectedRole] = useState("candidate");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("Aditya Bhawsar");
  const [username, setUsername] = useState("candidate");
  const [password, setPassword] = useState("candidate123");
  const [loading, setLoading] = useState(false);

  const isGuest = selectedRole === "guest";

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === "guest") {
      setMode("login");
      setUsername("");
      setPassword("");
      setName("");
      return;
    }

    if (role === "candidate") {
      setUsername("candidate");
      setPassword("candidate123");
      setName("Aditya Bhawsar");
    } else if (role === "recruiter") {
      setUsername("recruiter");
      setPassword("recruiter123");
      setName("Rafael Amancio");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isGuest) {
      const success = await loginUser({ role: "guest" });
      setLoading(false);
      return success;
    }

    const success = await loginUser({
      role: selectedRole,
      mode,
      name,
      username,
      password
    });

    setLoading(false);

    if (!success) {
      setPassword("");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ background: "#ffffff", padding: "0.85rem 1.6rem", borderRadius: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.12)", margin: "0 auto 1.2rem auto" }}>
            <img src="/globalco-logo.png" alt="GlobalCo Logo" style={{ height: "42px", objectFit: "contain" }} />
          </div>
          <div>
            <span className="eyebrow">Careers & Talent Portal</span>
          </div>
          <h1>{mode === "signup" ? "Create Candidate Profile" : "Welcome to the Hiring Portal"}</h1>
          <p>{mode === "signup" ? "Register to apply for engineering & product openings." : "Select your role to sign in to the official talent & hiring portal."}</p>
        </div>

        <div className="role-grid">
          {Object.entries(roleDefaults).map(([role, config]) => {
            const Icon = role === "candidate" ? UserRound : role === "recruiter" ? BriefcaseIcon : Sparkles;

            return (
              <button
                key={role}
                type="button"
                className={`role-option ${selectedRole === role ? "selected" : ""}`}
                onClick={() => handleRoleSelect(role)}
              >
                <div className="role-icon">
                  <Icon size={20} />
                </div>
                <strong>{config.label}</strong>
                <small>{config.description}</small>
              </button>
            );
          })}
        </div>

        {!isGuest && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <button
              type="button"
              className={`nav-link-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
              style={{ flex: 1 }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`nav-link-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => setMode("signup")}
              style={{ flex: 1 }}
            >
              Sign Up
            </button>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isGuest && mode === "signup" && (
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Aditya Bhawsar"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {!isGuest && (
            <>
              <label className="field">
                <span>Username</span>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter username"
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </label>
            </>
          )}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading
              ? isGuest
                ? "Entering as Guest..."
                : mode === "signup"
                  ? "Creating Account..."
                  : "Signing In..."
              : isGuest
                ? "Explore Globalco as Guest"
                : mode === "signup"
                  ? `Create ${roleDefaults[selectedRole].label} Account`
                  : `Continue to Globalco Portal`}
            {!isGuest && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="auth-hint" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
          <ShieldCheck size={16} color="var(--success)" />
          <span>
            {isGuest
              ? "Guest mode allows exploring all Globalco positions without authentication."
              : selectedRole === "candidate"
                ? "Demo Candidate login: username 'candidate' / password 'candidate123'"
                : "Demo Recruiter login: username 'recruiter' / password 'recruiter123'"}
          </span>
        </div>
      </div>
    </div>
  );
}

