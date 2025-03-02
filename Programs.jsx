import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import '../styles/emg.css';

const Programs = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    name: '',
    description: ''
  });

  const handleCreateProgram = () => {
    setShowCreateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setPrograms(prev => [...prev, newProgram]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowCreateForm(false);
      setNewProgram({ name: '', description: '' });
    }, 2000);
  };

  return (
    <div className="programs-page">
      <nav className="programs-navbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h2>Programs</h2>
      </nav>

      {!showCreateForm ? (
        <div className="programs-container">
          <button className="create-program-button" onClick={handleCreateProgram}>
            <FaPlusCircle className="plus-icon" />
            <span>Create New Program</span>
          </button>

          <div className="programs-list">
            {programs.map((program, index) => (
              <div key={index} className="program-item">
                <h3>{program.name}</h3>
                <p>{program.description}</p>
                <div className="program-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="create-program-form">
          <form onSubmit={handleSave}>
            <div className="form-field">
              <label>Program Name</label>
              <input
                type="text"
                name="name"
                value={newProgram.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea
                name="description"
                value={newProgram.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="save-btn">
              Save
            </button>
          </form>
        </div>
      )}

      {showSuccess && (
        <div className="success-modal">
          <div className="success-content">
            <FaCheckCircle className="success-icon" />
            <h2>Program Saved Successfully!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;