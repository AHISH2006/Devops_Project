import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaLock, 
  FaDownload, 
  FaTrash 
} from 'react-icons/fa';
import "../styles/home.css";

export const PrivacySecurityPage = () => {
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleDownloadData = () => {
    // Implement data download logic
    console.log('Downloading user data...');
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>Privacy and Security</h1>
      </div>
      

      <div className="privacy-section">
        <h2>Security</h2>
        <button 
          className="privacy-item"
          onClick={handleChangePassword}
        >
          <div className="item-left">
            <FaLock className="icon blue-icon" />
            <span>Change Password</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </button>
      </div>

      <div className="privacy-section">
        <h2>Your Data</h2>
        <button 
          className="privacy-item"
          onClick={handleDownloadData}
        >
          <div className="item-left">
            <FaDownload className="icon blue-icon" />
            <span>Download Your Data</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </button>

        <button 
          className="privacy-item delete-item"
          onClick={handleDeleteAccount}
        >
          <div className="item-left">
            <FaTrash className="icon red-icon" />
            <span className="red-text">Delete Account</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default PrivacySecurityPage;