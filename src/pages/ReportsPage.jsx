import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileAlt, FaCog, FaFileDownload, FaGoogleDrive, FaFileUpload } from "react-icons/fa";
import "../styles/reports.css";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("viewer");

  const bottomNavOptions = [
    { icon: <FaFileAlt />, title: "View", id: "viewer" },
    { icon: <FaCog />, title: "Manage", id: "manage" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "viewer":
        return (
          <div className="reports-content">
            <h2>Saved Reports</h2>
            <div className="reports-list">
              <div className="report-item">
                <FaFileAlt className="report-icon" />
                <div className="report-details">
                  <h3>EMG Report - 01/15/2024</h3>
                  <p>Last modified: 2 days ago</p>
                </div>
              </div>
              <div className="report-item">
                <FaFileAlt className="report-icon" />
                <div className="report-details">
                  <h3>EMS Treatment - 01/12/2024</h3>
                  <p>Last modified: 5 days ago</p>
                </div>
              </div>
              <div className="report-item">
                <FaFileAlt className="report-icon" />
                <div className="report-details">
                  <h3>Patient Progress - 01/10/2024</h3>
                  <p>Last modified: 1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "manage":
        return (
          <div className="manage-reports">
            <h2>Manage Reports</h2>
            <div className="manage-options">
              <div className="manage-option">
                <h3>Export to ZIP</h3>
                <p>Export reports to ZIP archive as backup or to transfer to other devices</p>
                <button className="action-button">
                  <FaFileDownload /> Export
                </button>
              </div>
              <div className="manage-option">
                <h3>Save to Google Drive</h3>
                <p>Save reports to cloud storage to backup or to view on other devices.</p>
                <button className="action-button">
                  <FaGoogleDrive /> Save
                </button>
              </div>
              <div className="manage-option">
                <h3>Import from Google Drive</h3>
                <p>Import reports from cloud storage and save them to your device</p>
                <button className="action-button">
                  <FaFileUpload /> Import
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="welcome-message">
            <h2>Welcome to Reports</h2>
            <p>Select an option from the bottom navigation to begin</p>
          </div>
        );
    }
  };

  return (
    <div className="reports-container">
      <nav className="top-navbar">
        <div className="nav-left">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h2>Reports</h2>
        </div>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>

      <nav className="bottom-nav">
        {bottomNavOptions.map((option) => (
          <button
            key={option.id}
            className={`nav-option ${activeSection === option.id ? 'active' : ''}`}
            onClick={() => setActiveSection(option.id)}
          >
            <div className="nav-icon">{option.icon}</div>
            <span>{option.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ReportsPage;