import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="https://cdn.vectorstock.com/i/500p/73/56/exchange-revenue-dollar-arrows-cycle-icon-simple-vector-52517356.jpg" alt="XE" className="logo-img" />
          </Link>
        </div>
        
        <div className="hamburger-wrapper">
          <Hamburger toggled={isOpen} toggle={setOpen} color="#ffffff" />
        </div>
        
        <nav className={`main-nav ${isOpen ? 'active' : ''}`}>
          <div className="nav-group">
            <Link to="/" className="nav-link" onClick={() => setOpen(false)}>Converter</Link>
            <Link to="/business" className="nav-link" onClick={() => setOpen(false)}>Business</Link>
          </div>
          
          <div className="nav-divider"></div>
          
          <div className="nav-group">
            <Link to="/historical-data" className="nav-link" onClick={() => setOpen(false)}>Charts</Link>
            <Link to="/currency-list" className="nav-link" onClick={() => setOpen(false)}>Currency List</Link>
            <Link to="/transfers" className="nav-link" onClick={() => setOpen(false)}>Money transfers</Link>
            <Link to="/tools" className="nav-link" onClick={() => setOpen(false)}>Tools</Link>
            <Link to="/resources" className="nav-link" onClick={() => setOpen(false)}>Resources</Link>
          </div>
          
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-link" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setOpen(false)}>Register</Link>
            <Link to="/contact" className="btn btn-outline" onClick={() => setOpen(false)}>Contact Us</Link>
          </div>
        </nav>
        
        {isOpen && <div className="menu-overlay" onClick={() => setOpen(false)}></div>}
      </div>
    </header>
  );
};

export default Navbar;