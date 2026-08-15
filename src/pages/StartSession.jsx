import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaUserAlt } from 'react-icons/fa';
import '../styles/StartSession.css';

const StartSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deviceType = location.state?.deviceType || 'EMG';
  const [isLiveSession, setIsLiveSession] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  
  const [sessionData, setSessionData] = useState({
    name: '',
    age: '',
    condition: '',
    contact: '',
    treatmentPlan: '',
    duration: '',
    intensity: 'Low',
    notes: '',
    treatmentType: ''
  });

  const treatmentTypes = [
    { id: 'pain', label: 'Pain Relief' },
    { id: 'muscle', label: 'Muscle Stim' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'therapy', label: 'Therapy' }
  ];

  const handleStartSession = () => {
    setIsLiveSession(true);
  };

  const handleEndSession = () => {
    navigate('/devicecontrol');
  };

  if (isLiveSession) {
    return (
      <div className="session-container">
        <nav className="session-nav">
          <button className="back-button" onClick={() => setIsLiveSession(false)}>
            <FaArrowLeft /> Back
          </button>
          <h1>Live session</h1>
        </nav>
        
        <div className="live-session-content">
          <div className="patient-info">
            <h2>Patient Name: {sessionData.name}</h2>
            <h2>Session Type: {deviceType}</h2>
          </div>
          
          <div className="data-visualization">
            [Real-time Data visualization placeholder]
          </div>
          
          <div className="session-controls">
            <button className="start-btn">Start Session</button>
            <button className="end-btn" onClick={handleEndSession}>End Session</button>
          </div>
        </div>
      </div>
    );
  }

  if (showPatientDetails) {
    return (
      <div className="session-container">
        <nav className="session-nav">
          <button className="back-button" onClick={() => setShowPatientDetails(false)}>
            <FaArrowLeft /> Back
          </button>
          <h1>Patient Details</h1>
        </nav>

        <div className="session-content">
          <form className="patient-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={sessionData.name}
                onChange={(e) => setSessionData({...sessionData, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={sessionData.age}
                onChange={(e) => setSessionData({...sessionData, age: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Condition</label>
              <input
                type="text"
                value={sessionData.condition}
                onChange={(e) => setSessionData({...sessionData, condition: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                value={sessionData.contact}lder
                onChange={(e) => setSessionData({...sessionData, contact: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Current treatment Plan</label>
              <textarea
                value={sessionData.treatmentPlan}
                onChange={(e) => setSessionData({...sessionData, treatmentPlan: e.target.value})}
                placeholder="Details of the current treatment plan"
              />
            </div>

            <button type="button" className="start-session-btn" onClick={() => setShowPatientDetails(false)}>
              Continue to Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="session-container">
      <nav className="session-nav">
        <button className="back-button" onClick={() => navigate('/devicecontrol')}>
          <FaArrowLeft /> Back
        </button>
        <h1>{deviceType === 'EMG' ? 'Patient Details' : 'Create New Session'}</h1>
      </nav>

      <div className="session-content">
        {deviceType === 'EMG' ? (
          // EMG Session Form
          <form className="patient-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={sessionData.name}
                onChange={(e) => setSessionData({...sessionData, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={sessionData.age}
                onChange={(e) => setSessionData({...sessionData, age: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Condition</label>
              <input
                type="text"
                value={sessionData.condition}
                onChange={(e) => setSessionData({...sessionData, condition: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                value={sessionData.contact}
                onChange={(e) => setSessionData({...sessionData, contact: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Current treatment Plan</label>
              <textarea
                value={sessionData.treatmentPlan}
                onChange={(e) => setSessionData({...sessionData, treatmentPlan: e.target.value})}
                placeholder="Details of the current treatment plan"
              />
            </div>

            <div className="emg-visualization">
              <h3>EMG Data visualization</h3>
              <div className="visualization-placeholder">
                [Data Visualization Placeholder]
              </div>
            </div>

            <button type="button" className="start-session-btn" onClick={handleStartSession}>
              Start Session
            </button>
          </form>
        ) : (
          // EMS Session Form
          <form className="session-form">
            <div className="treatment-types">
              <h3>Treatment Type</h3>
              <div className="treatment-grid">
                {treatmentTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`treatment-type-btn ${sessionData.treatmentType === type.id ? 'active' : ''}`}
                    onClick={() => setSessionData({...sessionData, treatmentType: type.id})}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="session-details">
              <h3>Session details</h3>
              <div className="form-group">
                <label>
                  <FaClock /> Duration
                </label>
                <input
                  type="number"
                  value={sessionData.duration}
                  onChange={(e) => setSessionData({...sessionData, duration: e.target.value})}
                />
              </div>

              <div className="intensity-control">
                <label>
                  Intensity
                </label>
                <div className="intensity-buttons">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`intensity-btn ${sessionData.intensity === level ? 'active' : ''}`}
                      onClick={() => setSessionData({...sessionData, intensity: level})}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={sessionData.notes}
                  onChange={(e) => setSessionData({...sessionData, notes: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="button" 
              className="patient-details-btn"
              onClick={() => setShowPatientDetails(true)}
            >
              Patient details
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StartSession;