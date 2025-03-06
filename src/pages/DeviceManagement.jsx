import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaMicrochip, FaBolt, FaQrcode, FaPen, FaPlus } from 'react-icons/fa';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styles/device.css';

const DeviceManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDevice, setSelectedDevice] = useState('EMG');
  const [userRole, setUserRole] = useState('');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [deviceForm, setDeviceForm] = useState({
    name: '',
    type: '',
    serialNumber: '',
    photo: null
  });
  
  useEffect(() => {
    // Determine user role from navigation state
    if (location.state?.role) {
      setUserRole(location.state.role);
      console.log("Role set from navigation state:", location.state.role);
    }
  }, [location]);

  const handleBackClick = () => {
    if (userRole === 'doctor') {
      navigate('/doctorhome');
    } else if (userRole === 'patient') {
      navigate('/patienthome');
    } else {
      navigate('/'); // Fallback to home
    }
  };

  useEffect(() => {
    if (showQRScanner) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        videoConstraints: {
          facingMode: "user",
          aspectRatio: 1
        }
      });

      const style = document.createElement('style');
      style.textContent = `
        #reader video {
          transform: scaleX(-1);
        }
      `;
      document.head.appendChild(style);

      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setScanResult(result);
        setShowQRScanner(false);
        setDeviceForm(prevForm => ({
          ...prevForm,
          serialNumber: result
        }));
        setShowManualEntry(true);
        document.head.removeChild(style);
      }

      function error(err) {
        console.error('QR Scan Error:', err);
      }

      return () => {
        scanner.clear();
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
  }, [showQRScanner]);

  const handleAddDeviceClick = () => {
    setShowAddDevice(true);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    setShowAddDevice(false);
  };

  const handleQRScanner = () => {
    setShowQRScanner(true);
    setShowAddDevice(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
        <div className="modal-header">
          <h2>Add New Device</h2>
          <button className="close-modal-btn" onClick={() => setShowAddDevice(false)}>×</button>
        </div>
        <div className="add-device-options">
          <button className="option-btn" onClick={handleManualEntry}>
            <FaPen />
            <span>Manual Entry</span>
          </button>
          {selectedDevice === 'EMS' && (
            <button className="option-btn" onClick={handleQRScanner}>
              <FaQrcode />
              <span>Scan QR Code</span>
            </button>
          )}
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

  const renderQRScanner = () => (
    <div className="modal-overlay">
      <div className="modal-content qr-scanner">
        <div className="modal-header">
          <button className="back-button" onClick={() => setShowQRScanner(false)}>
            <FaArrowLeft />
          </button>
          <h2>Scan QR Code</h2>
        </div>
        <div id="reader"></div>
        {scanResult && (
          <div className="scan-result">
            <p>Success! QR Code Scanned:</p>
            <p>{scanResult}</p>
          </div>
        )}
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
          <h2>Device Management</h2>
        </div>
        <div className="nav-actions">
          <button className="help-btn">Need Help?</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="welcome-section">
          <h1>{selectedDevice} Device Management</h1>
          <p>Manage your {selectedDevice} devices and connections</p>
        </div>

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
          
          <button className="add-device-btn" onClick={handleAddDeviceClick}>
            <FaPlus />
          </button>
          
          <div className="device-list">
            <h2>Device Confirmation</h2>
            <div className="device-info">
              <h3 className="Name">Name:</h3>
              <h3 className="Name">Model:</h3>
              <h3 className="Name">Serial Number:</h3>
            </div>
          </div>
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

      {showAddDevice && renderAddDeviceModal()}
      {showManualEntry && renderManualEntryForm()}
      {showQRScanner && renderQRScanner()}
    </div>
  );
};

export default DeviceManagement;