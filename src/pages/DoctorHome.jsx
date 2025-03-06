import React, { useState } from "react";
import "../styles/doctorHome.css";
import { FaHome, FaMicrochip, FaCog, FaFileAlt, FaBell, FaUser } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const DoctorHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  
  const recentActivities = [
    { icon: "🆕", title: "New Appointment", time: "2 mins ago" },
    { icon: "📡", title: "Device Status Update", time: "1 hour ago" },
    { icon: "📜", title: "Report Generated", time: "3 hours ago" }
  ];

  const handleNavigation = (path, tab) => {
    setActiveTab(tab);
    if (path === '/device-management') {
      navigate(path, { state: { role: 'doctor' } });
    } else {
      navigate(path);
    }
  };

  return (
    <div className="doctor-home">
      <div className="top-nav">
        <div className="user-profile">
          <FaUser onClick={()=>navigate("/Account")} className="user-icon" />
        </div>
        <h2>Welcome Doctor</h2>
        <FaBell className="notification-icon" />
      </div>

      <div className="main-content">
        <p className="greeting">Have a great day ahead</p>

        <div className="stats-container">
          <button className="stat-box">📅 Appointments</button>
          <button className="stat-box">🌐 Active Devices</button>
          <button className="stat-box">👥 Total Patients</button>
          <button className="stat-box">⏳ Hours Active</button>
        </div>

        <h3 className="section-title">Recent Activities</h3>
        <div className="activities-container">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-details">
                <h4>{activity.title}</h4>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <nav className="bottom-nav">
        <button 
          className={`nav-option ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigation('/doctorhome', 'home')}
        >
          <FaHome className="nav-icon" />
          <span>Home</span>
        </button>
        <button 
          className={`nav-option ${activeTab === 'device-management' ? 'active' : ''}`}
          onClick={() => handleNavigation('/device-management', 'device-management')}
        >
          <FaMicrochip className="nav-icon" />
          <span>Devices</span>
        </button>
        <button 
          className={`nav-option ${activeTab === 'device-control' ? 'active' : ''}`}
          onClick={() => handleNavigation('/devicecontrol', 'device-control')}
        >
          <FaCog className="nav-icon" />
          <span>Control</span>
        </button>
        <button 
          className={`nav-option ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => handleNavigation('/reports', 'reports')}
        >
          <FaFileAlt className="nav-icon" />
          <span>Reports</span>
        </button>
      </nav>
    </div>
  );
};

export default DoctorHome;