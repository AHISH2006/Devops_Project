import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import '../styles/PersonalInformation.css';

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Naveen',
    email: 'naveenmurugan@gmail.com',
    patientId: 'PT2024001',
    phone: '+91 9876543210',
    age: '25',
    gender: 'Male',
    address: '123 Main Street',
    bloodGroup: 'O+',
    emergencyContact: '+91 9876543211'
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  return (
    <div className="personal-info-container">
      <header className="personal-info-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft />
        </button>
        <h1>Personal Information</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="edit-btn"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </header>

      <div className="profile-image-container">
        <div className="profile-image">
          <FaUser />
        </div>
      </div>

      <div className="info-content">
        {isEditing ? (
          <form className="edit-form">
            <div className="form-section">
              <h2>Basic Information</h2>
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
                <label>Blood Group</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={userData.bloodGroup}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Contact Information</h2>
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
                <label>Address</label>
                <textarea
                  name="address"
                  value={userData.address}
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
            </div>

            <div className="form-actions">
              <button type="button" className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="info-display">
            <div className="info-section">
              <h2>Basic Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name</label>
                  <span>{userData.name}</span>
                </div>
                <div className="info-item">
                  <label>Age</label>
                  <span>{userData.age}</span>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <span>{userData.gender}</span>
                </div>
                <div className="info-item">
                  <label>Blood Group</label>
                  <span>{userData.bloodGroup}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Contact Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Email</label>
                  <span>{userData.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <span>{userData.phone}</span>
                </div>
                <div className="info-item">
                  <label>Address</label>
                  <span>{userData.address}</span>
                </div>
                <div className="info-item">
                  <label>Emergency Contact</label>
                  <span>{userData.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;