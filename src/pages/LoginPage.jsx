import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import InputField from "../components/InputField";
import Button from "../components/Button";

// ─────────────────────────────────────────────────────────────
//  Demo users — frontend only, no backend needed
//  To connect real auth: replace handleLogin with an API call
// ─────────────────────────────────────────────────────────────
const DEMO_USERS = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    email: "admin@devops.local",
    path: "/DoctorHome",
  },
  {
    username: "devops",
    password: "devops123",
    role: "admin",
    name: "DevOps Engineer",
    email: "devops@devops.local",
    path: "/DoctorHome",
  },
  {
    username: "user",
    password: "user123",
    role: "user",
    name: "Regular User",
    email: "user@devops.local",
    path: "/PatientHome",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    // Simulate a small auth delay (makes it feel real)
    setTimeout(() => {
      const match = DEMO_USERS.find(
        (u) =>
          u.username === username.trim().toLowerCase() &&
          u.password === password
      );

      if (match) {
        // Save user session to localStorage
        localStorage.setItem("userRole", match.role);
        localStorage.setItem("userName", match.name);
        localStorage.setItem("userEmail", match.email);
        localStorage.setItem("userUsername", match.username);
        navigate(match.path);
      } else {
        setError("Invalid username or password. Check the demo credentials below.");
      }
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const fillDemo = (user) => {
    setUsername(user.username);
    setPassword(user.password);
    setError("");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Login</h2>

        {/* ── Demo credentials panel ── */}
        <div style={{
          background: "#0f172a",
          border: "1px solid #1e3a5f",
          borderRadius: "10px",
          padding: "12px 14px",
          marginBottom: "18px",
          fontSize: "0.78rem",
          color: "#94a3b8",
        }}>
          <p style={{ color: "#38bdf8", fontWeight: 600, marginBottom: "8px" }}>
            🔐 Demo Credentials — click to fill
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {DEMO_USERS.map((u) => (
              <button
                key={u.username}
                onClick={() => fillDemo(u)}
                style={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  color: u.role === "admin" ? "#a78bfa" : "#34d399",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  transition: "border-color 0.2s",
                }}
                onMouseOver={(e) => e.target.style.borderColor = "#6366f1"}
                onMouseOut={(e) => e.target.style.borderColor = "#334155"}
              >
                {u.role === "admin" ? "👨‍💼" : "👤"} {u.username} / {u.password}
              </button>
            ))}
          </div>
        </div>

        {/* ── Form ── */}
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {error && (
          <p style={{
            color: "#ef4444",
            fontSize: "0.8rem",
            margin: "4px 0 8px",
            textAlign: "left",
          }}>
            ⚠️ {error}
          </p>
        )}

        <Button
          text={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
        />

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Sign Up
          </span>
        </p>
        <p>
          <span onClick={() => navigate("/forgot-password")} className="link">
            Forgot password?
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
