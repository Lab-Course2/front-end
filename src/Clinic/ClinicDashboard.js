import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/ClinicDashboard.css'; // Import the stylesheet

const ClinicDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Welcome to Your Clinic Dashboard</h2>
      </div>
      <nav className="nav-container">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/doctors" className="nav-link">Doctors</Link></li>
          <li><Link to="/create-doctor" className="nav-link">Create Doctor</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ClinicDashboard;