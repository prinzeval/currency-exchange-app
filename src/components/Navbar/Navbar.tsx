import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="https://cdn.vectorstock.com/i/500p/73/56/exchange-revenue-dollar-arrows-cycle-icon-simple-vector-52517356.jpg" alt="XE" className="logo-img" />
          </Link>
        </div>
        
        <nav className="main-nav">
          <div className="nav-group">
            <Link to="/" className="nav-link">Personal</Link>
            <Link to="/business" className="nav-link">Business</Link>
          </div>
          
          <div className="nav-divider"></div>
          
          <div className="nav-group">
            <Link to="/send" className="nav-link">Charts</Link>
            <div className="dropdown">
              <Link to="/transfers" className="nav-link dropdown-toggle">Money transfers</Link>
            </div>
            <Link to="/converter" className="nav-link">Converter</Link>
            <div className="dropdown">
              <Link to="/tools" className="nav-link dropdown-toggle">Tools</Link>
            </div>
            <div className="dropdown">
              <Link to="/resources" className="nav-link dropdown-toggle">Resources</Link>
            </div>
          </div>
        </nav>
        
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-link">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
          <Link to="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;