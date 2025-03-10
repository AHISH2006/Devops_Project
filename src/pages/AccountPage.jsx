import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaSignOutAlt, FaFileMedical,
  FaShieldAlt, FaQuestionCircle, FaInfoCircle, 
  FaCog
} from 'react-icons/fa';
import '../styles/home.css';

export const AccountPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <FaUser />,
      title: 'Personal Information',
      onClick: () => navigate('/personal')
    },
    {
      icon: <FaCog/>,
      title: 'Settings',
      onClick: () => navigate('/documents')
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
          <h1>Naveen</h1>
          <p>Patient ID: PT2024001</p>
          <p>gmail.com</p>
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

      <button className="logout-button" onClick={() => navigate('/login')}>
        <FaSignOutAlt />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default AccountPage;