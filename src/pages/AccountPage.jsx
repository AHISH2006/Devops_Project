import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaSignOutAlt, FaFileMedical,
  FaShieldAlt, FaQuestionCircle, FaInfoCircle, 
  FaCog
} from 'react-icons/fa';
import '../styles/home.css';

export const AccountPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    patientId: '',
    email: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    // Read user from localStorage (set during login)
    const name     = localStorage.getItem('userName')     || 'Guest User';
    const email    = localStorage.getItem('userEmail')    || 'guest@devops.local';
    const username = localStorage.getItem('userUsername') || 'guest';
    const role     = localStorage.getItem('userRole')     || 'user';

    setUserData({
      name,
      email,
      patientId: role === 'admin' ? 'ADMIN-001' : `USR-${username.toUpperCase()}`,
      loading: false,
      error: null
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userUsername');
    navigate('/login');
  };

  const menuItems = [
    {
      icon: <FaUser />,
      title: 'Personal Information',
      onClick: () => navigate('/personal')
    },
    {
      icon: <FaCog />,
      title: 'Settings',
      onClick: () => navigate("/setting")
    },
    {
      icon: <FaShieldAlt />,
      title: 'Privacy & Security',
      onClick: () => navigate('/privacy')
    },
    {
      icon: <FaQuestionCircle />,
      title: 'Help & Support',
      onClick: () => navigate('/support')
    },
    {
      icon: <FaInfoCircle />,
      title: 'App Version',
      onClick: () => navigate('/app-version')
    }
  ];

  return (
    <div className="account-container">
      <nav className="account-nav">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="nav-title">
          {userData.loading ? (
            <div className="loading-skeleton">
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          ) : userData.error ? (
            <div className="error-message">{userData.error}</div>
          ) : (
            <>
              <h1>{userData.name}</h1>
              <p>Patient ID: {userData.patientId}</p>
              <p>{userData.email}</p>
            </>
          )}
        </div>
      </nav>

      <div className="profile-section">
        <div className="profile-image">
          <FaUser className="default-avatar" />
        </div>
      </div>

      <div className="menu-section">
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            className="menu-item"
            onClick={item.onClick}
          >
            <div className="menu-item-left">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default AccountPage;