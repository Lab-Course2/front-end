import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import bg1 from "./Images/4.png"

const Sidebar = ({ userRole }) => {
  const location = useLocation();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleOffCanvasToggle = () => {
    setShowOffCanvas(!showOffCanvas);
  };

  return (
    <>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-transparent" style={{ width: "80px" }}>
            <button className="btn btn-primary rounded-circle d-block d-md-block mb-2" style={{ padding: "0px" }} onClick={handleOffCanvasToggle}>
                <span className="fs-3">☰</span>
            </button>
        </div>
        <Offcanvas show={showOffCanvas} onHide={handleOffCanvasToggle}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <div className="mt-3 text-center position-relative">
            <div className="rounded-circle overflow-hidden d-inline-block" style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0' }}>
              <img src={bg1} alt="User Photo" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p className="mt-2 lead md-5">Name Surname</p>
            <hr className="bg-primary"></hr>
          </div>

            {userRole === 'Clinic' && (
          <>
           <div className="list-group mt-3">
               <Link to="/clinci-dashboard" className={`list-group-item py-2 ${location.pathname === '/clinic-dashboard' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-house fs-4 me-2"></i>
                    <span>Dashboard</span>
                </Link>
                <Link to="/appointments" className={`list-group-item py-2 ${location.pathname === '/appointments' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-house fs-4 me-2"></i>
                    <span>Appointments</span>
                </Link>
                <Link to="/consultations" className={`list-group-item py-2 ${location.pathname === '/consultations' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-house fs-4 me-2"></i>
                    <span>Consultations</span>
                </Link>
                <Link to="/news" className={`list-group-item py-2 ${location.pathname === '/news' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-house fs-4 me-2"></i>
                    <span>News</span>
                </Link>
                <Link to="/doctor-list" className={`list-group-item py-2 ${location.pathname === '/doctor-list' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-house fs-4 me-2"></i>
                    <span>Doctors</span>
                </Link>
                <Link to="/clinic-profile" className={`list-group-item py-2 ${location.pathname === '/clinic-profile' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-person fs-4 me-2"></i>
                    <span>Clinic Profile</span>
                </Link>
            </div>
          </>)}
          {userRole === 'Patient' && (
          <>
          <div className="list-group mt-3">
          <Link to="/patient-dashboard" className={`list-group-item py-2 ${location.pathname === '/patient-dashboard' ? 'active' : ''}`} onClick={handleOffCanvasToggle}>
                    <i className="bi bi-house fs-4 me-2"></i>
                    <span>Dashboard</span>
                </Link>
            <Link to="/search-list" className={`list-group-item py-2 ${location.pathname === '/search-list' ? 'active' : ''}`}>
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
            <Link to="/patient-profile" className={`list-group-item py-2 ${location.pathname === '/patient-profile' ? 'active' : ''}`}>
              <i className="bi bi-person fs-4 me-2"></i>
              <span>Patient Profile</span>
            </Link>
          </div>

          </>
        )}

                
            </Offcanvas.Body>
        </Offcanvas>
    </>
);

};

export default Sidebar;