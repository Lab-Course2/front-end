import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) =>
{
  const navbarTextColor = '#ffffff'; // White color for text

  return (
    <BootstrapNavbar bg="primary" expand="lg" sticky="top" data-bs-theme="dark">
      <BootstrapNavbar.Brand href="/home" className="navbar-brand">
        <span style={{ color: navbarTextColor }}>AppointEase</span>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/home" style={{ color: navbarTextColor }}>Home</Nav.Link>
          <Nav.Link href="/about-us" style={{ color: navbarTextColor }}>About Us</Nav.Link>
          <Nav.Link href="/contact-us" style={{ color: navbarTextColor }}>Contact Us</Nav.Link>
          {isLoggedIn ? (
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile" style={{ color: '#ffffff' }}>Profile</NavDropdown.Item>
              <NavDropdown.Item href="/patient-dashboard" style={{ color: '#ffffff' }}>Dashboard</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{ color: '#ffffff' }}>Log Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link href="/login" style={{ color: navbarTextColor }}>Login</Nav.Link>
              <Nav.Link href="/register-patient" style={{ color: navbarTextColor }}>Register</Nav.Link>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;