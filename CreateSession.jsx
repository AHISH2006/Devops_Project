import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUserAlt, FaDesktop, FaBolt, FaSync, FaClinicMedical, FaCheckCircle } from 'react-icons/fa';
import '../styles/emg.css';

const CreateSession = () => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState({
    patient: '',
    dateTime: '',
    sessionType: '',
    duration: '',
    notes: '',
    treatmentType: '',
    intensity: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const treatmentTypes = [
    { id: 'pain', name: 'Pain Relief', icon: <FaDesktop /> },
    { id: 'muscle', name: 'Muscle Stim', icon: <FaBolt /> },
    { id: 'recovery', name: 'Recovery', icon: <FaSync /> },
    { id: 'therapy', name: 'Therapy', icon: <FaClinicMedical /> }
  ];

  const intensityLevels = ['Low', 'Medium', 'High'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTreatmentSelect = (treatmentId) => {
    setSessionData(prevData => ({
      ...prevData,
      treatmentType: treatmentId
    }));
  };

  const handleIntensitySelect = (level) => {
    setSessionData(prevData => ({
      ...prevData,
      intensity: level
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Session Data:', sessionData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/emg-session');
    }, 2000);
  };

  return (
    <div className="create-session-container">
      <nav className="session-navbar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>Create New Session</h1>
      </nav>

      <div className="session-form-container">
        <form onSubmit={handleSubmit} className="session-form">
          <div className="form-group">
            <label>
              <FaUserAlt className="input-icon" />
              Select Patient
            </label>
            <input
              type="text"
              name="patient"
              value={sessionData.patient}
              onChange={handleInputChange}
              placeholder="Search patient name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaCalendarAlt className="input-icon" />
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={sessionData.dateTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaClock className="input-icon" />
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={sessionData.duration}
              onChange={handleInputChange}
              placeholder="Enter session duration"
              min="15"
              max="180"
              required
            />
          </div>

          <div className="form-group">
            <label>Treatment Type</label>
            <div className="treatment-grid">
              {treatmentTypes.map((treatment) => (
                <button
                  key={treatment.id}
                  type="button"
                  className={`treatment-btn ${sessionData.treatmentType === treatment.id ? 'active' : ''}`}
                  onClick={() => handleTreatmentSelect(treatment.id)}
                >
                  <span className="treatment-icon">{treatment.icon}</span>
                  <span>{treatment.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Intensity Level</label>
            <div className="intensity-buttons">
              {intensityLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`intensity-btn ${sessionData.intensity === level ? 'active' : ''}`}
                  onClick={() => handleIntensitySelect(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={sessionData.notes}
              onChange={handleInputChange}
              placeholder="Add session notes or special instructions"
              rows="4"
            />
          </div>

          <button type="submit" className="schedule-btn">
            Schedule Session
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="success-modal">
          <div className="success-content">
            <FaCheckCircle className="success-icon" />
            <h2>Session Scheduled Successfully!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSession;