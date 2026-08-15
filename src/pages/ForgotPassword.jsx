<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + email);
    navigate("/reset-password");
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <p>Enter your email or phone number to receive a reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={() => navigate("/reset-password")} className="pass">Resend Link</button>
      </form>
      <button className="btn secondary" onClick={() => navigate("/login")}>Back to Login</button>
    </div>
  );
};

export default ForgotPassword;
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + email);
    navigate("/reset-password");
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <p>Enter your email or phone number to receive a reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={() => navigate("/reset-password")} className="pass">Resend Link</button>
      </form>
      <button className="btn secondary" onClick={() => navigate("/login")}>Back to Login</button>
    </div>
  );
};

export default ForgotPassword;
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
