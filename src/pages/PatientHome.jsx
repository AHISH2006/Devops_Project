import React, { useState, useRef, useEffect } from "react";
import "../styles/doctorHome.css";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PatientHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const recentActivities = [
    { icon: "✅", title: "Build #47 Succeeded", time: "5 mins ago" },
    { icon: "🚀", title: "Deployed to Staging", time: "2 hours ago" },
    { icon: "📋", title: "Report Available", time: "1 day ago" }
  ];

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

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="doctor-home">
      <div className="top-nav">
        <button
          ref={menuButtonRef}
          className="menu-icon-btn"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu />
        </button>
        <h2>User Dashboard</h2>
        <FaBell className="notification-icon" />
      </div>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Recent Activities</h3>
        </div>
        <div className="sidebar-activities">
          {recentActivities.map((activity, index) => (
            <div key={index} className="sidebar-activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-details">
                <h4>{activity.title}</h4>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <p className="greeting">Have a great day ahead 👋</p>

        <div className="stats-container">
          <button
            onClick={() => navigate("/pipeline")}
            className="stat-box"
          >
            🔁 Pipeline Status
          </button>
          <button
            onClick={() => navigate("/environments")}
            className="stat-box"
          >
            🌐 System Health
          </button>
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          <button
            onClick={() => navigate("/pipeline")}
            className="action-btn"
          >
            🔁 View Pipelines
          </button>
          <button
            onClick={() => navigate("/Account")}
            className="action-btn"
          >
            👤 Account
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="action-btn"
          >
            📋 View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;