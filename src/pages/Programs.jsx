import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import TicTacToe from '../components/TicTacToe';
import '../styles/devicecontrol.css';

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
        <button className="back-btn" onClick={() => navigate("/devicecontrol")}>
          <FaArrowLeft /> Back
        </button>
        <h2>EMG Programs</h2>
      </nav>

      <div className="content-wrapper">
        <h1>Treatment Programs</h1>
        <p>Manage your EMG treatment programs and play a relaxing game while you wait</p>
        
        <div className="create-program-button">
          <span className="plus-icon">+</span>
          <span>Create New Program</span>
        </div>

        <TicTacToe />
      </div>
    </div>
  );
};

export default Programs