import React, { useState, useRef, useEffect } from "react";
import "../styles/doctorHome.css";
import { FaUser, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DoctorHome = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const recentActivities = [
    { icon: "🆕", title: "New Appointment", time: "2 mins ago" },
    { icon: "📡", title: "Device Status Update", time: "1 hour ago" },
    { icon: "📜", title: "Report Generated", time: "3 hours ago" }
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

  const sidebarItems = [
    { icon: "👤", title: "Account", path: '/Account' },
    { icon: "📋", title: "Reports", path: '/reports' },
    { icon: "⚙️", title: "Settings", path: '/settings' },
    { icon: <FaSignOutAlt />, title: 'Logout', path: '/login' }
  ];

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
        <h2>Welcome</h2>
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
            <div className="sidebar-activities">
            <h3>Recent Activities</h3>
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
          </div>
        </div>
      </div>

      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <p className="greeting">Have a great day ahead</p>

        <div className="stats-container">
          <button className="stat-box">📅 Appointments</button>
          <button className="stat-box">🌐 Active Devices</button>
          <button className="stat-box">👥 Total Patients</button>
          <button className="stat-box">⏳ Hours Active</button>
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          <button onClick={() => navigate("/devicecontrol")} className="action-btn">
            ⚙️ Device Control
          </button>
          <button onClick={() => navigate("/device-management")} className="action-btn">
            📟 Device Management
          </button>
          <button onClick={() => navigate("/Account")} className="action-btn">
            👤 Accounts
          </button>
          <button onClick={() => navigate("/reports")} className="action-btn">
            📄 View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;