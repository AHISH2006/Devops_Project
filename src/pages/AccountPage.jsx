import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaFileAlt, FaComments, FaCog, 
  FaQuestionCircle, FaSync, FaInfoCircle, FaSignOutAlt, 
  FaCamera, FaImage, FaEnvelope, FaPhone, FaLock, FaUserEdit 
} from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import '../styles/home.css';

const AccountPage = () => {
  const navigate = useNavigate();
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showHealthReport, setShowHealthReport] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const menuItems = [
    { 
      icon: <FaFileAlt />, 
      title: 'Health report', 
      path: '/health-report',
      content: [
        { date: '2024-01-15', type: 'EMG Session', duration: '30 mins' },
        { date: '2024-01-10', type: 'EMS Session', duration: '45 mins' },
      ]
    },
    { 
      icon: <BiMessageDetail />, 
      title: 'Message', 
      path: '/messages',
      messages: [
        { id: 1, from: 'Dr. Smith', text: 'Your next session is scheduled', time: '2h ago' },
        { id: 2, from: 'System', text: 'Treatment report ready', time: '1d ago' },
      ]
    },
    { icon: <FaCog />, title: 'Settings', path: '/settings' },
    { icon: <FaQuestionCircle />, title: 'Help', path: '/help' },
    { icon: <FaComments />, title: 'Questions and Feedback', path: '/feedback' },
    { icon: <FaSync />, title: 'Check for updates', path: '/updates' },
    { icon: <FaInfoCircle />, title: 'About', path: '/about' },
    { icon: <FaSignOutAlt />, title: 'Logout', path: '/login' }
  ];

  const handleMediaSelect = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'camera' ? 'image/*;capture=camera' : 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setProfileImage(e.target.result);
        reader.readAsDataURL(file);
      }
      setShowMediaOptions(false);
    };
    
    input.click();
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMenuClick = (item) => {
    if (item.title === 'Health report') {
      setShowHealthReport(true);
    } else if (item.title === 'Message') {
      setShowMessages(true);
    } else if (item.title === 'Settings') {
      setShowSettings(true);
    } else {
      navigate(item.path);
    }
  };

  const handleSaveProfile = () => {
    // Add API call here to save profile data
    setShowEditProfile(false);
  };

  const handleSaveSettings = () => {
    // Add API call here to save settings
    setShowSettings(false);
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>

      <div className="profile-section">
        <div className="profile-photo" onClick={() => setShowMediaOptions(true)}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <FaUser className="profile-icon" />
          )}
          <div className="camera-icon">
            <FaCamera />
          </div>
        </div>
        <div className="profile-info">
          <h2>{profileData.name}</h2>
          <button className="edit-button" onClick={() => setShowEditProfile(true)}>
            Edit <FaUserEdit />
          </button>
        </div>
      </div>

      {showMediaOptions && (
        <div className="media-options-modal">
          <div className="media-options-content">
            <button onClick={() => handleMediaSelect('camera')}>
              <FaCamera /> Take Photo
            </button>
            <button onClick={() => handleMediaSelect('gallery')}>
              <FaImage /> Choose from Gallery
            </button>
            <button onClick={() => setShowMediaOptions(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="edit-profile-modal">
          <div className="edit-profile-content">
            <div className="edit-profile-header">
              <h3>Edit Profile</h3>
              <button className="close-modal-btn" onClick={() => setShowEditProfile(false)}>×</button>
            </div>
            <div className="edit-form">
              <div className="edit-form-group">
                <label><FaUser /> Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="edit-form-group">
                <label><FaEnvelope /> Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="edit-form-group">
                <label><FaPhone /> Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="edit-profile-buttons">
                <button className="save-profile-btn" onClick={handleSaveProfile}>
                  Save Changes
                </button>
                <button className="cancel-profile-btn" onClick={() => setShowEditProfile(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-modal-btn" onClick={() => setShowSettings(false)}>×</button>
            </div>
            <div className="settings-form">
              <div className="settings-group">
                <label><FaLock /> Change Password</label>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleProfileChange}
                    placeholder="Current Password"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="newPassword"
                    value={profileData.newPassword}
                    onChange={handleProfileChange}
                    placeholder="New Password"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={handleProfileChange}
                    placeholder="Confirm New Password"
                  />
                </div>
              </div>
              <div className="settings-actions">
                <button className="save-settings-btn" onClick={handleSaveSettings}>
                  Save Changes
                </button>
                <button className="cancel-settings-btn" onClick={() => setShowSettings(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHealthReport && (
        <div className="modal">
          <div className="modal-content">
            <h3>Previous Sessions</h3>
            <div className="sessions-list">
              {menuItems[0].content.map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-date">{session.date}</div>
                  <div className="session-info">
                    <div>{session.type}</div>
                    <div>{session.duration}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowHealthReport(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {showMessages && (
        <div className="modal">
          <div className="modal-content">
            <h3>Messages</h3>
            <div className="messages-list">
              {menuItems[1].messages.map((message) => (
                <div key={message.id} className="message-item">
                  <div className="message-header">
                    <strong>{message.from}</strong>
                    <span>{message.time}</span>
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowMessages(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="menu-section">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {(index === 2 || index === 5) && <div className="menu-divider"></div>}
            <button 
              className="menu-item" 
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-item-left">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-title">{item.title}</span>
              </div>
              <FaArrowLeft className="arrow-icon" />
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AccountPage;
