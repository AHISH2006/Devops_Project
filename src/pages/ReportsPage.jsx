import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaFileAlt, FaCog, FaArrowLeft, FaFileDownload, FaGoogleDrive, FaFileUpload } from "react-icons/fa";
import "../styles/reports.css";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const sidebarOptions = [
    { icon: <FaFileAlt />, title: "Report Viewer", id: "viewer" },
    { icon: <FaCog />, title: "Manage Reports", id: "manage" }
  ];

  const handleSidebarItemClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

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
              {/* Add more report items as needed */}
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
            <p>Select an option from the sidebar to begin</p>
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
          <button
            ref={menuButtonRef}
            className="menu-button"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <h2>Reports</h2>
        </div>
      </nav>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Reports Menu</h3>
        </div>
        <div className="sidebar-options">
          {sidebarOptions.map((option) => (
            <button
              key={option.id}
              className={`sidebar-option ${activeSection === option.id ? 'active' : ''}`}
              onClick={() => handleSidebarItemClick(option.id)}
            >
              {option.icon}
              <span>{option.title}</span>
            </button>
          ))}
        </div>
      </div>

      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default ReportsPage;
