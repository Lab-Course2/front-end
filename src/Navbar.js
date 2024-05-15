import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navbarColor = '#add8e6'; // Light blue color

  return (
    <BootstrapNavbar bg={navbarColor} expand="lg" className="fixed-top"> {/* Add fixed-top class here */}
      <BootstrapNavbar.Brand as={Link} to="/home">MindMuse</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isLoggedIn ? (
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register-patient">Register</Nav.Link>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;