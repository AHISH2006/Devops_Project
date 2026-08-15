import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/logo.png"
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "doctor") {
      navigate("/DoctorHome");
    } else if (username === "patient") {
      navigate("/PatientHome");
    } else {
      alert("Invalid username or role. Use 'doctor' or 'patient'.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Essencecore Logo" className="logo" />
        <h2>Login</h2>
        <InputField
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         
        />
        
        <Button text="Login" onClick={handleLogin} />
        <p>
          Don't have an account?
          <span onClick={() => navigate("/signup")} className="link">
            Sign Up
          </span>
        </p>
        <p>
         
          <span onClick={() => navigate("/forgot-password")} className="link">
          forgot password?
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
