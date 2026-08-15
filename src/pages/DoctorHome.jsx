import React, { useState, useRef, useEffect } from "react";
import "../styles/doctorHome.css";
import { FaSignOutAlt } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const DoctorHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  const sidebarItems = [
    { icon: "👤", title: "Account", path: '/Account' },
    { icon: "📋", title: "Deployment Reports", path: '/reports' },
    { icon: "🔁", title: "Pipeline Status", path: '/pipeline' },
    { icon: "🚀", title: "Deploy Build", path: '/deploy' },
    { icon: "🌐", title: "Environments", path: '/environments' },
    { icon: "🖥️", title: "Server Management", path: '/device-management' },
    { icon: "⚙️", title: "Settings", path: '/settings' },
    { icon: "❓", title: "Help", path: '/help' },
    { icon: <FaSignOutAlt />, title: 'Logout', path: '/login' }
  ];

  const recentActivities = [
    { icon: "✅", title: "Build #47 Succeeded", time: "5 mins ago" },
    { icon: "🚀", title: "Deployed to Production", time: "1 hour ago" },
    { icon: "📋", title: "Deployment Report Generated", time: "3 hours ago" }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSidebarItemClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
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
        <h2>Admin Dashboard</h2>
        <FaBell className="notification-icon" />
      </div>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className="sidebar-item"
                onClick={() => handleSidebarItemClick(item.path)}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-title">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-divider"></div>

          <div className="recent-activities">
            <h4>Recent Activities</h4>
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-icon">{activity.icon}</span>
                <div className="activity-info">
                  <p className="activity-title">{activity.title}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <p className="greeting">Welcome back, Admin 👋</p>

        <div className="stats-container">
          <button onClick={() => navigate('/pipeline')} className="stat-box">🔁 Pipeline Runs</button>
          <button onClick={() => navigate('/environments')} className="stat-box">🌐 Environments</button>
          <button onClick={() => navigate('/device-management')} className="stat-box">🖥️ Servers</button>
          <button onClick={() => navigate('/reports')} className="stat-box">📋 Reports</button>
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          <button onClick={() => navigate("/pipeline")} className="action-btn">
            🔁 Pipeline Status
          </button>
          <button onClick={() => navigate("/deploy")} className="action-btn">
            🚀 Deploy Build
          </button>
          <button onClick={() => navigate("/environments")} className="action-btn">
            🌐 Environments
          </button>
          <button onClick={() => navigate("/reports")} className="action-btn">
            📋 View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;