import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlusCircle, FaListAlt, FaUserMd, FaHistory, FaBars, FaMicrochip, FaBolt } from 'react-icons/fa';
import '../styles/devicecontrol.css';

const DeviceControl = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
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

  const sessionButtons = [
    {
      title: 'Create Session',
      icon: <FaPlusCircle />,
      onClick: () => navigate('/create-session', { state: { deviceType: selectedDevice }}),
      description: `Start a new ${selectedDevice} treatment session`
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

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  const handleButtonClick = (button) => {
    if (button.onClick) {
      button.onClick();
    } else {
      navigate(button.path);
    }
  };

  return (
    <div className="device-container">
      <nav className="device-navbar">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate("/doctorhome")}>
            <FaArrowLeft /> Back
          </button>
          <button
            ref={menuButtonRef}
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <h2>Device Control Portal</h2>
        </div>
      </nav>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Device Control</h3>
        </div>
        <div className="device-options">
          <button
            className={`device-option ${selectedDevice === 'EMG' ? 'active' : ''}`}
            onClick={() => handleDeviceClick('EMG')}
          >
            <FaMicrochip className="option-icon" />
            <span>EMG Devices</span>
          </button>
          <button
            className={`device-option ${selectedDevice === 'EMS' ? 'active' : ''}`}
            onClick={() => handleDeviceClick('EMS')}
          >
            <FaBolt className="option-icon" />
            <span>EMS Devices</span>
          </button>
        </div>
      </div>

      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {selectedDevice ? (
          <>
            <div className="welcome-section">
              <h1>Welcome to {selectedDevice} Session Portal</h1>
              <p>Select an option to begin your session management</p>
            </div>

            <div className="session-options">
              {sessionButtons.map((button, index) => (
                <button 
                  key={index}
                  className="session-card"
                  onClick={() => handleButtonClick(button)}
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
          </>
        ) : (
          <div className="welcome-message">
            <h2>Welcome to Device Control</h2>
            <p>Select a device type from the sidebar to begin</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeviceControl;