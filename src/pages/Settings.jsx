import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaSignOutAlt, FaClock,
  FaDesktop, FaBell, FaBatteryThreeQuarters, FaLock,
  FaQuestionCircle, FaInfoCircle, FaTrash
} from 'react-icons/fa';
import { MdOutlineDevices } from 'react-icons/md';
import "../styles/home.css";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    treatmentReminders: true,
    sessionCompletion: true,
    batteryAlerts: true
  });

  const handleToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>Settings</h1>
      </div>

      <div className="settings-section">
        <h2>Treatment preferences</h2>
        <div className="settings-item">
          <div className="item-left">
            <MdOutlineDevices className="icon" />
            <span>Intensity Levels</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaClock className="icon" />
            <span>Session Duration</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaDesktop className="icon" />
            <span>Treatment Program</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-item">
          <div className="item-left">
            <FaBell className="icon" />
            <span>Treatment Reminders</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.treatmentReminders}
              onChange={() => handleToggle('treatmentReminders')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaBell className="icon" />
            <span>Session Completion</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.sessionCompletion}
              onChange={() => handleToggle('sessionCompletion')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaBatteryThreeQuarters className="icon" />
            <span>Battery Alerts</span>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.batteryAlerts}
              onChange={() => handleToggle('batteryAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account & Privacy</h2>
        <div className="user-profile-card">
          <div className="profile-info">
            <FaUser className="profile-icon" />
            <div className="user-details">
              <h3>Naveen Murugan</h3>
              <p>naveenmurugan@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaLock className="icon" />
            <span>Password Management</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
      </div>

      <div className="settings-section">
        <h2>Support & Info</h2>
        <div className="settings-item">
          <div className="item-left">
            <FaQuestionCircle className="icon" />
            <span>Help Center</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaInfoCircle className="icon" />
            <span>Contact Support</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
        <div className="settings-item">
          <div className="item-left">
            <FaInfoCircle className="icon" />
            <span>About</span>
          </div>
          <FaArrowLeft className="arrow-icon" />
        </div>
      </div>

      <button className="logout-button" onClick={() => navigate('/login')}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

      <button className="delete-account-button">
        <FaTrash />
        <span>Delete Account</span>
      </button>
    </div>
  );
};

export default SettingsPage;