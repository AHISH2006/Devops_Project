<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Create a Strong Password</h2>
      <p>Your password must contain at least 6 characters, including numbers, letters, and special characters.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button onClick={() => navigate("/login")} className="btn">Reset Password</button>
        <button className="btn secondary" onClick={() => navigate("/login")}>Back to Login</button>
      </form>
    </div>
  );
};

export default ResetPassword;
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Create a Strong Password</h2>
      <p>Your password must contain at least 6 characters, including numbers, letters, and special characters.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button onClick={() => navigate("/login")} className="btn">Reset Password</button>
        <button className="btn secondary" onClick={() => navigate("/login")}>Back to Login</button>
      </form>
    </div>
  );
};

export default ResetPassword;
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
