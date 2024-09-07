import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const headerStyle = {
  backgroundColor: '#343a40', 
};

const brandStyle = {
  color: '#ffffff',
  fontWeight: 'bold',
};

const navLinkStyle = {
  color: '#ffffff',
};

const navLinkHoverStyle = {
  color: '#f8f9fa', 
};

const Header = () => (
  <Navbar style={headerStyle} expand="lg">
    <Navbar.Brand as={Link} to="/patrimoine" style={brandStyle}>Patrimoine</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/patrimoine" style={navLinkStyle} onMouseOver={e => e.target.style.color = navLinkHoverStyle.color} onMouseOut={e => e.target.style.color = navLinkStyle.color}>Patrimoine</Nav.Link>
        <Nav.Link as={Link} to="/possessions" style={navLinkStyle} onMouseOver={e => e.target.style.color = navLinkHoverStyle.color} onMouseOut={e => e.target.style.color = navLinkStyle.color}>Possessions</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
