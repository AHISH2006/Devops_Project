import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaMicrochip, FaBolt, FaCog, FaCheckCircle, FaArrowLeft, FaQrcode, FaPen } from 'react-icons/fa';
import '../styles/device.css';

const DeviceManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDeviceOptions, setShowDeviceOptions] = useState({ EMG: false, EMS: false });
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [deviceForm, setDeviceForm] = useState({
    name: '',
    type: '',
    serialNumber: '',
    photo: null
  });
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const modalRef = useRef(null);

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
    const previousPath = location.state?.from || '/doctorhome';
    navigate(previousPath);
  };

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setShowDeviceOptions(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  const handleAddDeviceClick = () => {
    setShowAddDevice(true);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    setShowAddDevice(false);
  };

  const handleQRScanner = () => {
    navigate('/qr-scanner');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Device Form:', deviceForm);
    setShowManualEntry(false);
    setDeviceForm({
      name: '',
      type: '',
      serialNumber: '',
      photo: null
    });
  };

  const renderAddDeviceModal = () => (
    <div className="modal-overlay" onClick={() => setShowAddDevice(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add New Device</h2>
        <div className="add-device-options">
          <button className="option-btn" onClick={handleManualEntry}>
            <FaPen />
            <span>Manual Entry</span>
          </button>
          <button className="option-btn" onClick={handleQRScanner}>
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
          <h2>Add Device</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Device Name</label>
            <input
              type="text"
              value={deviceForm.name}
              onChange={(e) => setDeviceForm({...deviceForm, name: e.target.value})}
              placeholder="Enter device name"
              required
            />
          </div>
          <div className="form-group">
            <label>Device Type</label>
            <input
              type="text"
              value={deviceForm.type}
              onChange={(e) => setDeviceForm({...deviceForm, type: e.target.value})}
              placeholder="Enter device type"
              required
            />
          </div>
          <div className="form-group">
            <label>Serial Number</label>
            <input
              type="text"
              value={deviceForm.serialNumber}
              onChange={(e) => setDeviceForm({...deviceForm, serialNumber: e.target.value})}
              placeholder="Enter serial number"
              required
            />
          </div>
          <div className="form-group">
            <label>Device Photo</label>
            <div className="photo-upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setDeviceForm({...deviceForm, photo: e.target.files[0]})}
              />
            </div>
          </div>
          <p className="form-note">
            Please ensure all device information is accurate. This helps in tracking maintenance and property claims.
          </p>
          <button type="submit" className="submit-btn">Add Device</button>
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
          <h2>Device Management Portal</h2>
        </div>
        <div className="nav-actions">
          <button className="help-btn">Need Help?</button>
        </div>
      </nav>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Device Control</h3>
        </div>

        <div className="device-options">
          <div className="device-group">
            <button
              className={`device-option ${selectedDevice === 'EMG' ? 'active' : ''}`}
              onClick={() => handleDeviceClick('EMG')}
            >
              <FaMicrochip className="option-icon" />
              <span>EMG Devices</span>
            </button>
          </div>

          <div className="device-group">
            <button
              className={`device-option ${selectedDevice === 'EMS' ? 'active' : ''}`}
              onClick={() => handleDeviceClick('EMS')}
            >
              <FaBolt className="option-icon" />
              <span>EMS Devices</span>
            </button>
          </div>
        </div>
      </div>

      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <div className="content-header">
          <h1>{selectedDevice ? `${selectedDevice} Device Management` : 'Device Overview'}</h1>
        </div>

        {selectedDevice ? (
          <div className="device-dashboard">
            <div className="device-list">
              <h2>Connected Devices</h2>
              <div className="device-grid">
                {[1, 2, 3].map((device) => (
                  <div key={device} className="device-item">
                    <div className="device-status online"></div>
                    <h3>{selectedDevice} Device #{device}</h3>
                    <p>Status: Active</p>
                    <p>Last Active: 2 mins ago</p>
                    <button className="device-action-btn">Manage</button>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn" onClick={handleAddDeviceClick}>Add New Device</button>
            <div className="device-list">
              <h2>Device Confirmation</h2>
              <div className="device-info">
                <h3 className="Name">Name:</h3>
                <h3 className="Name">Model:</h3>
                <h3 className="Name">Serial Number:</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-message">
            <h2>Welcome to Device Management</h2>
            <p>Select a device type from the sidebar to begin</p>
          </div>
        )}
      </main>

      {showAddDevice && renderAddDeviceModal()}
      {showManualEntry && renderManualEntryForm()}
    </div>
  );
};

export default DeviceManagement;
