import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaServer, FaDatabase, FaCog, FaCheckCircle, FaArrowLeft, FaPen, FaQrcode } from 'react-icons/fa';
import '../styles/device.css';

const DeviceManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [showTypeOptions, setShowTypeOptions] = useState({ AppServer: false, DBServer: false });
  const [showAddServer, setShowAddServer] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [serverForm, setServerForm] = useState({
    name: '',
    type: '',
    ipAddress: '',
    environment: 'production'
  });
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const servers = {
    AppServer: [
      { id: 1, name: 'App Server #1', status: 'Running', uptime: '99.8%', lastCheck: '1 min ago', env: 'Production' },
      { id: 2, name: 'App Server #2', status: 'Running', uptime: '99.5%', lastCheck: '1 min ago', env: 'Staging' },
      { id: 3, name: 'App Server #3', status: 'Stopped', uptime: '95.1%', lastCheck: '10 min ago', env: 'Development' },
    ],
    DBServer: [
      { id: 1, name: 'MongoDB Primary', status: 'Running', uptime: '99.9%', lastCheck: '1 min ago', env: 'Production' },
      { id: 2, name: 'MongoDB Replica', status: 'Running', uptime: '99.7%', lastCheck: '2 min ago', env: 'Production' },
    ]
  };

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

  const handleBackClick = () => {
    const previousPath = location.state?.from || '/DoctorHome';
    navigate(previousPath);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setShowTypeOptions(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Server Form:', serverForm);
    setShowManualEntry(false);
    setServerForm({ name: '', type: '', ipAddress: '', environment: 'production' });
  };

  const renderAddServerModal = () => (
    <div className="modal-overlay" onClick={() => setShowAddServer(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add New Server</h2>
        <div className="add-device-options">
          <button className="option-btn" onClick={() => { setShowManualEntry(true); setShowAddServer(false); }}>
            <FaPen />
            <span>Manual Entry</span>
          </button>
          <button className="option-btn" onClick={() => navigate('/qr-scanner')}>
            <FaQrcode />
            <span>Scan QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderManualEntryForm = () => (
    <div className="modal-overlay" onClick={() => setShowManualEntry(false)}>
      <div className="modal-content manual-entry" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="back-button" onClick={() => setShowManualEntry(false)}>
            <FaArrowLeft />
          </button>
          <h2>Add Server</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Server Name</label>
            <input
              type="text"
              value={serverForm.name}
              onChange={(e) => setServerForm({ ...serverForm, name: e.target.value })}
              placeholder="e.g. App Server #4"
              required
            />
          </div>
          <div className="form-group">
            <label>Server Type</label>
            <input
              type="text"
              value={serverForm.type}
              onChange={(e) => setServerForm({ ...serverForm, type: e.target.value })}
              placeholder="e.g. Application / Database / Cache"
              required
            />
          </div>
          <div className="form-group">
            <label>IP Address</label>
            <input
              type="text"
              value={serverForm.ipAddress}
              onChange={(e) => setServerForm({ ...serverForm, ipAddress: e.target.value })}
              placeholder="e.g. 192.168.1.10"
              required
            />
          </div>
          <div className="form-group">
            <label>Environment</label>
            <select
              value={serverForm.environment}
              onChange={(e) => setServerForm({ ...serverForm, environment: e.target.value })}
            >
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>
          <p className="form-note">
            Ensure server IP and credentials are configured in your inventory before adding.
          </p>
          <button type="submit" className="submit-btn">Add Server</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="device-container">
      <nav className="top-navbar">
        <div className="nav-left">
          <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
          <button
            ref={menuButtonRef}
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <h2>Server Management</h2>
        </div>
        <div className="nav-actions">
          <button className="help-btn">Need Help?</button>
        </div>
      </nav>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Server Types</h3>
        </div>
        <div className="device-options">
          <div className="device-group">
            <button
              className={`device-option ${selectedType === 'AppServer' ? 'active' : ''}`}
              onClick={() => handleTypeClick('AppServer')}
            >
              <FaServer className="option-icon" />
              <span>App Servers</span>
            </button>
          </div>
          <div className="device-group">
            <button
              className={`device-option ${selectedType === 'DBServer' ? 'active' : ''}`}
              onClick={() => handleTypeClick('DBServer')}
            >
              <FaDatabase className="option-icon" />
              <span>DB Servers</span>
            </button>
          </div>
        </div>
      </div>

      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <div className="content-header">
          <h1>{selectedType ? `${selectedType === 'AppServer' ? 'Application' : 'Database'} Servers` : 'Server Overview'}</h1>
        </div>

        {selectedType ? (
          <div className="device-dashboard">
            <div className="device-list">
              <h2>Connected Servers</h2>
              <div className="device-grid">
                {servers[selectedType].map((server) => (
                  <div key={server.id} className="device-item">
                    <div className={`device-status ${server.status === 'Running' ? 'online' : 'offline'}`}></div>
                    <h3>{server.name}</h3>
                    <p>Status: <strong>{server.status}</strong></p>
                    <p>Uptime: {server.uptime}</p>
                    <p>Env: {server.env}</p>
                    <p>Last Check: {server.lastCheck}</p>
                    <button className="device-action-btn">Manage</button>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn" onClick={() => setShowAddServer(true)}>+ Add New Server</button>
            <div className="device-list">
              <h2>Server Info</h2>
              <div className="device-info">
                <h3 className="Name">Name:</h3>
                <h3 className="Name">IP Address:</h3>
                <h3 className="Name">Environment:</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-message">
            <h2>Welcome to Server Management</h2>
            <p>Select a server type from the sidebar to view instances</p>
          </div>
        )}
      </main>

      {showAddServer && renderAddServerModal()}
      {showManualEntry && renderManualEntryForm()}
    </div>
  );
};

export default DeviceManagement;