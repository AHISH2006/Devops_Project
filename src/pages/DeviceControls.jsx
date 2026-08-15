import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaPlusCircle, FaCog,FaFileAlt,FaListAlt, FaUserMd, FaHistory, FaMicrochip, FaBolt ,FaPlayCircle} from 'react-icons/fa';
import '../styles/device.css';

const DeviceControls = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDevice, setSelectedDevice] = useState('EMG');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = location.state?.role;
    if (role) {
      setUserRole(role);
    }
  }, [location]);

  const handleBackClick = () => {
    const currentRole = location.state?.role;
    if (currentRole === 'doctor') {
      navigate('/doctorhome');
    } else if (currentRole === 'patient') {
      navigate('/patienthome');
    } else {
      navigate('/doctorhome'); // Default to doctor home
    }
  };

  const getSessionButtons = () => {
    const commonButtons = [
      {
        title: 'Treatment History',
        icon: <FaHistory />,
        path: '/treatment-history',
        description: 'View past treatment records'
      }
    ];

    const emsButtons = [
      {
        title: 'Add Patient',
        icon: <FaPlusCircle/>,
        onClick: () => navigate('/startsession', { 
          state: { deviceType: selectedDevice }
        }),
       
      },
 
      {
        title: 'Start Session',
        icon: <FaUserMd />,
        onClick: () => navigate('/start-session', { 
          state: { 
            deviceType: selectedDevice,
            isScheduling: true
          }
        }),
        
      },
      ...commonButtons
    ];

    const emgButtons = [
      {
        title: 'Add Patient',
        icon: <FaPlusCircle />,
        onClick: () => navigate('/startsession', { 
          state: { deviceType: selectedDevice }
        }),
        description: 'Adding Patients to the system'
      },
      {
        title: 'Start Session',
        icon: <FaPlayCircle />,
        path: '/patient-details',
        description: 'Start EMG monitoring session'
      },
      {
        title: 'My Records',
        icon: <FaFileAlt />,
        path: '/emg-analysis',
        description: 'View patient EMG records'
      },

      ...commonButtons
    ];

    return selectedDevice === 'EMS' ? emsButtons : emgButtons;
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
      <nav className="top-navbar">
        <div className="nav-left">
          <button className="back-button" onClick={()=>navigate("/doctorhome")}>
            <FaArrowLeft /> Back
          </button>
          <h2>Device Control Portal</h2>
        </div>
      </nav>

      <main className="main-content">
        <div className="welcome-section">
          <h1>{selectedDevice} Control Panel</h1>
          <p className='pa'>Select an option to manage your {selectedDevice} device</p>
        </div>

        <div className="session-options">
          {getSessionButtons().map((button, index) => (
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
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-option ${selectedDevice === 'EMG' ? 'active' : ''}`}
          onClick={() => setSelectedDevice('EMG')}
        >
          <FaMicrochip className="nav-icon" />
          <span>EMG</span>
        </button>
        <button
          className={`nav-option ${selectedDevice === 'EMS' ? 'active' : ''}`}
          onClick={() => setSelectedDevice('EMS')}
        >
          <FaBolt className="nav-icon" />
          <span>EMS</span>
        </button>
      </nav>
    </div>
  );
};

export default DeviceControls;