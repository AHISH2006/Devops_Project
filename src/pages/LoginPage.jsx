import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import InputField from "../components/InputField";
import Button from "../components/Button";

// ─── Sample credentials (frontend-only, no backend required) ───
const SAMPLE_USERS = [
  { username: "admin",   password: "admin123",  role: "admin",   path: "/DoctorHome" },
  { username: "user",    password: "user123",   role: "user",    path: "/PatientHome" },
  { username: "devops",  password: "devops123", role: "admin",   path: "/DoctorHome" },
];
// ───────────────────────────────────────────────────────────────

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    const match = SAMPLE_USERS.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (match) {
      navigate(match.path);
    } else {
      setError("Invalid credentials. Try admin/admin123 or user/user123");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Essencecore Logo" className="logo" />
        <h2>Login</h2>

        {/* Sample credentials hint */}
        <div style={{
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "10px 14px",
          marginBottom: "16px",
          fontSize: "0.8rem",
          color: "#94a3b8",
          lineHeight: "1.6"
        }}>
          <strong style={{ color: "#38bdf8" }}>Sample Credentials:</strong><br />
          👨‍💼 Admin: <code style={{ color: "#a78bfa" }}>admin</code> / <code style={{ color: "#a78bfa" }}>admin123</code><br />
          👤 User: &nbsp;<code style={{ color: "#a78bfa" }}>user</code> &nbsp;/ <code style={{ color: "#a78bfa" }}>user123</code>
        </div>

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
          <p style={{ color: "#ef4444", fontSize: "0.82rem", margin: "6px 0 0" }}>
            ⚠️ {error}
          </p>
        )}

        <Button text="Login" onClick={handleLogin} />

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
