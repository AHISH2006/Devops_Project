import React, { useState, useRef, useEffect } from "react";
import "../styles/doctorHome.css";
import { FaArrowLeft, FaUser, FaFileAlt, FaComments, FaCog, FaQuestionCircle, FaSync, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaBell, FaTimes } from "react-icons/fa";

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
    { icon: "📋", title: "Health Reports", path: '/reports' },
    { icon: "💬", title: "Messages", path: '/messages' },
    { icon: "⚙️", title: "Settings", path: '/settings' },
    { icon: "❓", title: "Help", path: '/help' },
    { icon: "📝", title: "Feedback", path: '/feedback' },
    { icon: "🔄", title: "Check Updates", path: '/updates' },
    { icon: "ℹ️", title: "About", path: '/about' },
    { icon: <FaSignOutAlt />, title: 'Logout', path: '/login' }
  ];

  const recentActivities = [
    { icon: "🆕", title: "New Appointment", time: "2 mins ago" },
    { icon: "📡", title: "Device Status Update", time: "1 hour ago" },
    { icon: "📜", title: "Report Generated", time: "3 hours ago" }
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
        <h2>Welcome</h2>
        <FaBell className="notification-icon" />
      </div>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
        </div>
        <div className="sidebar-content">
          {/* Doctor Profile Section */}
          <div className="doctor-profile-section">
            <div className="profile-avatar">
              <FaUser className="avatar-icon" />
            </div>
            
            {showProfileEdit ? (
              <form className="profile-edit-form" onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={doctorProfile.name} 
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Specialty</label>
                  <input 
                    type="text" 
                    name="specialty" 
                    value={doctorProfile.specialty} 
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={doctorProfile.email} 
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="text" 
                    name="phone" 
                    value={doctorProfile.phone} 
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="profile-edit-actions">
                  <button type="submit" className="save-profile-btn">Save</button>
                  <button 
                    type="button" 
                    className="cancel-edit-btn"
                    onClick={() => setShowProfileEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <h4>{doctorProfile.name}</h4>
                <p className="profile-specialty">{doctorProfile.specialty}</p>
                <p className="profile-email">{doctorProfile.email}</p>
                <p className="profile-phone">{doctorProfile.phone}</p>
                <button 
                  className="edit-profile-btn"
                  onClick={() => setShowProfileEdit(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            )}
          </div>
          
          <div className="sidebar-divider"></div>

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
        <p className="greeting">Have a great day ahead</p>

        <div className="stats-container">
          <button className="stat-box">📅 Appointments</button>
          <button  className="stat-box">
          🌐 Active Devices
          </button>
          <button className="stat-box">👥 Total Patients</button>
          <button className="stat-box">⏳ Hours Active</button>
        </div>

        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions">
          <button onClick={() => navigate("/devicecontrol")} className="action-btn">
            ⚙️ Device Control
          </button>
          <button onClick={() => navigate("/device-management", { state: { from: '/Doctorhome' } })} className="action-btn">📟Device Management</button>
          <button onClick={() => navigate("/Account", { state: { from: '/Doctorhome' } })} className="action-btn">
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