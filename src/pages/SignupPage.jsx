import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/Logo.png";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    navigate("/login"); // Redirect to login after signup
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleFacebookSignup = () => {
    window.location.href = "https://www.facebook.com/login/";
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>

        <div className="divider">or sign up with</div>

        <div className="social-buttons">
          <button className="google-btn" onClick={handleGoogleSignup}>
            <FaGoogle className="icon" /> Sign up with Google
          </button>
          <button className="facebook-btn" onClick={handleFacebookSignup}>
            <FaFacebook className="icon" /> Sign up with Facebook
          </button>
        </div>

        <p className="redirect-text">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
