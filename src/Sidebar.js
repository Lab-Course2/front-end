import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css'; // Import your sidebar styles

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar-container" style={{ marginTop: '3.5%' }}>
      <div className="brand-container">
        <i className="bi bi-bootstrap-fill me-2 fs-4"></i>
        <span className="brand-name fs-4">Dashboard</span>
      </div>
      <hr className="text-dark"></hr>
      <div className="list-group list-group-flush">
        <Link to="/appointments" className={`list-group-item py-2 ${location.pathname === '/appointments' ? 'active' : ''}`}>
          <i className="bi bi-house fs-4 me-2"></i>
          <span>Appointments</span>
        </Link>
        <Link to="/consultations" className={`list-group-item py-2 ${location.pathname === '/consultations' ? 'active' : ''}`}>
          <i className="bi bi-house fs-4 me-2"></i>
          <span>Consultations</span>
        </Link>
        <Link to="/news" className={`list-group-item py-2 ${location.pathname === '/news' ? 'active' : ''}`}>
          <i className="bi bi-house fs-4 me-2"></i>
          <span>News</span>
        </Link>
        <Link to="/doctor-list" className={`list-group-item py-2 ${location.pathname === '/doctor-list' ? 'active' : ''}`}>
          <i className="bi bi-house fs-4 me-2"></i>
          <span>Doctors</span>
        </Link>
        <Link to="/create-doctor" className={`list-group-item py-2 ${location.pathname === '/create-doctor' ? 'active' : ''}`}>
          <i className="bi bi-house fs-4 me-2"></i>
          <span>Clinics</span>
        </Link>
        <Link to="/profile-patient" className={`list-group-item py-2 ${location.pathname === '/profile-patient' ? 'active' : ''}`}>
          <i className="bi bi-person fs-4 me-2"></i>
          <span>Patient Profile</span>
        </Link>
        <Link to="/clinic-profile" className={`list-group-item py-2 ${location.pathname === '/clinic-profile' ? 'active' : ''}`}>
          <i className="bi bi-person fs-4 me-2"></i>
          <span>Clinic Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;