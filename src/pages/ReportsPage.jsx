import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaFileAlt, FaCog, FaArrowLeft, FaFileDownload, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import "../styles/reports.css";

const deploymentReports = [
  { id: 1, build: '#52', branch: 'main', status: 'success', env: 'Production', triggeredBy: 'Admin', duration: '3m 12s', timestamp: '2026-08-15 14:30' },
  { id: 2, build: '#51', branch: 'feature/auth', status: 'failed', env: 'Staging', triggeredBy: 'Admin', duration: '1m 45s', timestamp: '2026-08-15 12:10' },
  { id: 3, build: '#50', branch: 'main', status: 'success', env: 'Staging', triggeredBy: 'Admin', duration: '2m 58s', timestamp: '2026-08-14 18:00' },
  { id: 4, build: '#49', branch: 'hotfix/login', status: 'success', env: 'Production', triggeredBy: 'Admin', duration: '3m 05s', timestamp: '2026-08-14 10:45' },
  { id: 5, build: '#48', branch: 'develop', status: 'failed', env: 'Development', triggeredBy: 'Admin', duration: '0m 52s', timestamp: '2026-08-13 09:20' },
];

const statusIcon = (status) => {
  if (status === 'success') return <FaCheckCircle style={{ color: '#22c55e' }} />;
  if (status === 'failed') return <FaTimesCircle style={{ color: '#ef4444' }} />;
  return <FaClock style={{ color: '#f59e0b' }} />;
};

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
    { icon: <FaFileAlt />, title: "Deployment Reports", id: "deployments" },
    { icon: <FaCog />, title: "Manage Reports", id: "manage" }
  ];

  const handleSidebarItemClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "deployments":
        return (
          <div className="reports-content">
            <h2>Deployment History</h2>
            <div className="reports-list">
              {deploymentReports.map((report) => (
                <div key={report.id} className="report-item">
                  <span className="report-icon">{statusIcon(report.status)}</span>
                  <div className="report-details">
                    <h3>Build {report.build} — {report.branch}</h3>
                    <p>
                      <strong>{report.env}</strong> &nbsp;|&nbsp;
                      ⏱ {report.duration} &nbsp;|&nbsp;
                      👤 {report.triggeredBy} &nbsp;|&nbsp;
                      🕐 {report.timestamp}
                    </p>
                    <span className={`status-badge status-${report.status}`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "manage":
        return (
          <div className="manage-reports">
            <h2>Manage Reports</h2>
            <div className="manage-options">
              <div className="manage-option">
                <h3>Export to CSV</h3>
                <p>Download all deployment reports as a CSV file for analysis</p>
                <button className="action-button">
                  <FaFileDownload /> Export CSV
                </button>
              </div>
              <div className="manage-option">
                <h3>Archive Old Reports</h3>
                <p>Archive deployment reports older than 30 days to keep the dashboard clean</p>
                <button className="action-button">
                  <FaCog /> Archive
                </button>
              </div>
              <div className="manage-option">
                <h3>Clear Failed Builds</h3>
                <p>Remove all failed build records from the reports log</p>
                <button className="action-button">
                  <FaTimesCircle /> Clear Failed
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="welcome-message">
            <h2>Deployment Reports</h2>
            <p>Select an option from the sidebar to view deployment history or manage reports</p>
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
          <h2>Deployment Reports</h2>
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