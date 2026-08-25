import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("globalco_user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("globalco_token") || "");
  
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem("globalco_theme") || "dark");
  
  // Navigation active view: 'jobs' | 'dashboard' | 'saved' | 'profile'
  const [currentView, setCurrentView] = useState("jobs");
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocationType, setSelectedLocationType] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [minSalary, setMinSalary] = useState(0);

  // Saved Jobs (Bookmarks)
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("globalco_saved")) || [];
    } catch {
      return [];
    }
  });

  // Applications and Stats
  const [applications, setApplications] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    remoteJobs: 0,
    featuredJobs: 0,
    remotePercentage: 0
  });

  // Modal States
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [applyJobModal, setApplyJobModal] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("globalco_theme", nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Sync Saved Jobs
  useEffect(() => {
    localStorage.setItem("globalco_saved", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("globalco_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("globalco_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("globalco_token", token);
    } else {
      localStorage.removeItem("globalco_token");
    }
  }, [token]);

  const loginUser = async ({ role, username, password, mode = "login", name }) => {
    if (role === "guest") {
      const safeUser = {
        role: "candidate",
        name: "Aditya Bhawsar",
        username: "aditya",
        email: "aditya@example.com",
        id: "candidate-user"
      };

      setUser(safeUser);
      setToken("");
      setCurrentView("jobs");
      showToast("Welcome to GlobalCo Careers!", "success");
      return true;
    }

    const safeUsername = (username || "").trim();
    if (!safeUsername || !password || password.length < 6) {
      showToast("Please enter a valid username and password (min 6 chars).", "error");
      return false;
    }

    try {
      const endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login";
      const payload = mode === "signup"
        ? { name: (name || safeUsername).trim(), username: safeUsername, password, role: role || "candidate" }
        : { username: safeUsername, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!data.success) {
        showToast(data.error || "Authentication failed.", "error");
        return false;
      }

      const authUser = {
        id: data.data.user.id,
        name: data.data.user.name || data.data.user.username,
        username: data.data.user.username,
        role: data.data.user.role,
        email: `${data.data.user.username}@globalco.com`
      };

      setUser(authUser);
      setToken(data.data.token);
      setCurrentView("jobs");
      showToast(mode === "signup" ? `Globalco account created for ${authUser.name}!` : `Welcome back, ${authUser.name}!`, "success");
      return true;
    } catch (error) {
      console.error("Login API error:", error);
      showToast("Unable to connect to auth server.", "error");
      return false;
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken("");
    setCurrentView("jobs");
    showToast("Signed out of Globalco portal.", "info");
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      showToast("Position removed from saved bookmarks", "info");
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      showToast("Position saved to your bookmarks!", "success");
    }
  };

  // Fetch Jobs from Backend API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("q", searchQuery);
      if (selectedCategory !== "All") queryParams.append("category", selectedCategory);
      if (selectedLocationType !== "All") queryParams.append("locationType", selectedLocationType);
      if (selectedJobType !== "All") queryParams.append("jobType", selectedJobType);
      if (minSalary > 0) queryParams.append("minSalary", minSalary);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(`/api/jobs?${queryParams.toString()}`, { headers });
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Stats & Applications for Dashboard
  const fetchDashboardData = async () => {
    try {
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      const [statsRes, appsRes] = await Promise.all([
        fetch("/api/stats", { headers: authHeaders }),
        fetch("/api/applications", { headers: authHeaders })
      ]);
      const statsData = await statsRes.json();
      const appsData = await appsRes.json();

      if (statsData.success) setStats(statsData.data);
      if (appsData.success) setApplications(appsData.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  const fetchMyApplications = async () => {
    if (!token || !user) return;
    try {
      const res = await fetch("/api/applications/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setMyApplications(data.data || []);
    } catch (err) {
      console.error("My applications fetch error:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchDashboardData();
    fetchMyApplications();
  }, [searchQuery, selectedCategory, selectedLocationType, selectedJobType, minSalary, token, user]);

  // Submit Application
  const submitApplication = async (formData) => {
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.id || "",
          candidateId: user?.id || ""
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("🎉 Application submitted successfully!", "success");
        setApplyJobModal(null);
        setSelectedJobModal(null);
        fetchJobs();
        fetchDashboardData();
        fetchMyApplications();
        return true;
      } else {
        showToast(`Error: ${data.error}`, "error");
        return false;
      }
    } catch (err) {
      showToast("Server connection error while submitting", "error");
      return false;
    }
  };

  const updateApplicationStatus = async (applicationId, nextStatus) => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Application marked as ${nextStatus}`, "success");
        fetchDashboardData();
        fetchMyApplications();
        return true;
      }
      showToast(data.error || "Unable to update status", "error");
      return false;
    } catch (err) {
      showToast("Status update failed", "error");
      return false;
    }
  };

  // Post New Job
  const createJob = async (jobData) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(jobData)
      });
      const data = await res.json();
      if (data.success) {
        showToast("🚀 Job posted successfully!", "success");
        setIsPostJobOpen(false);
        fetchJobs();
        fetchDashboardData();
        return true;
      } else {
        showToast(`Error: ${data.error}`, "error");
        return false;
      }
    } catch (err) {
      showToast("Server error while posting job", "error");
      return false;
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLocationType("All");
    setSelectedJobType("All");
    setMinSalary(0);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        user,
        loginUser,
        logoutUser,
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLocationType,
        setSelectedLocationType,
        selectedJobType,
        setSelectedJobType,
        minSalary,
        setMinSalary,
        resetFilters,
        savedJobIds,
        toggleSaveJob,
        applications,
        myApplications,
        stats,
        selectedJobModal,
        setSelectedJobModal,
        applyJobModal,
        setApplyJobModal,
        isPostJobOpen,
        setIsPostJobOpen,
        toastMessage,
        showToast,
        submitApplication,
        updateApplicationStatus,
        createJob,
        fetchJobs,
        fetchMyApplications
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);
