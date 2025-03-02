import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlusCircle, FaListAlt, FaUserMd, FaHistory } from 'react-icons/fa';
import '../styles/emg.css';

const EMGSession = () => {
  const navigate = useNavigate();

  const sessionButtons = [
    {
      title: 'Create EMG Session',
      icon: <FaPlusCircle />,
      path: '/create-session',
      description: 'Start a new EMG treatment session'
    },
    {
      title: 'Programs',
      icon: <FaListAlt />,
      path: '/programs',
      description: 'View and manage treatment programs'
    },
    {
      title: 'Patient Details',
      icon: <FaUserMd />,
      path: '/patient-details',
      description: 'Access patient information'
    },
    {
      title: 'Treatment History',
      icon: <FaHistory />,
      path: '/treatment-history',
      description: 'View past treatment records'
    }
  ];

  return (
    <div className="emg-container">
      <nav className="emg-navbar">
        <button className="back-btn" onClick={() => navigate("/doctorhome")}>
          <FaArrowLeft /> Back
        </button>
        <h2>EMG Session Management</h2>
      </nav>

      <div className="welcome-section">
        <h1>Welcome to EMG Session Portal</h1>
        <p>Select an option to begin your session management</p>
      </div>

      <div className="session-options">
        {sessionButtons.map((button, index) => (
          <button 
            key={index}
            className="session-card"
            onClick={() => navigate(button.path)}
          >
            <div className="card-icon">
              {button.icon}
            </div>
            <div className="card-content">
              <h3>{button.title}</h3>
              <p>{button.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EMGSession;
