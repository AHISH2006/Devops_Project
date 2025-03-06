import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaUser, FaSignOutAlt, FaFileMedical,
  FaShieldAlt, FaQuestionCircle, FaInfoCircle 
} from 'react-icons/fa';
import '../styles/home.css';

export const AccountPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [userData, setUserData] = useState({
    name: 'Naveen',
    email: 'gmail.com',
    patientId: 'PT2024001',
    phone: '+91 9876543210',
    age: '25',
    gender: 'Male',
    address: '123 Main Street',
    bloodGroup: 'O+',
    emergencyContact: '+91 9876543211'
  });

  const menuItems = [
    {
      icon: <FaUser />,
      title: 'Personal Information',
      onClick: () => setActiveSection('personal')
    },
    {
      icon: <FaFileMedical />,
      title: 'Reports & Documents',
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
      onClick: () => setActiveSection('version')
    }
  ];

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const renderPersonalInfo = () => {
    if (activeSection !== 'personal') return null;

    if (isEditing) {
      return (
        <div className="edit-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={userData.gender} onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={userData.bloodGroup}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Emergency Contact</label>
            <input
              type="tel"
              name="emergencyContact"
              value={userData.emergencyContact}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      );
    }

    return (
      <div className="info-display">
        <div className="info-group">
          <h3>Basic Information</h3>
          <div className="info-item">
            <label>Name:</label>
            <span>{userData.name}</span>
          </div>
          <div className="info-item">
            <label>Age:</label>
            <span>{userData.age}</span>
          </div>
          <div className="info-item">
            <label>Gender:</label>
            <span>{userData.gender}</span>
          </div>
          <div className="info-item">
            <label>Blood Group:</label>
            <span>{userData.bloodGroup}</span>
          </div>
        </div>

        <div className="info-group">
          <h3>Contact Information</h3>
          <div className="info-item">
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className="info-item">
            <label>Phone:</label>
            <span>{userData.phone}</span>
          </div>
          <div className="info-item">
            <label>Address:</label>
            <span>{userData.address}</span>
          </div>
          <div className="info-item">
            <label>Emergency Contact:</label>
            <span>{userData.emergencyContact}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderVersionInfo = () => {
    if (activeSection !== 'version') return null;
    return (
      <div className="info-display">
        <div className="info-group">
          <h3>App Information</h3>
          <div className="info-item">
            <label>Version:</label>
            <span>1.0.0</span>
          </div>
          <div className="info-item">
            <label>Last Updated:</label>
            <span>January 2024</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="account-container">
      <nav className="account-nav">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="nav-title">
          <h1>{userData.name}</h1>
          <p>Patient ID: {userData.patientId}</p>
          <p>{userData.email}</p>
        </div>
        {activeSection === 'personal' && (
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
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
            className={`menu-item ${activeSection === 'personal' && item.title === 'Personal Information' ? 'active' : ''}`}
            onClick={item.onClick}
          >
            <div className="menu-item-left">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {renderPersonalInfo()}
      {renderVersionInfo()}

      <button className="logout-button" onClick={() => navigate('/login')}>
        <FaSignOutAlt />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default AccountPage;