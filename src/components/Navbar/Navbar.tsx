import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { MdOnlinePrediction } from "react-icons/md";
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Function to show notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Function to handle coming soon links
  const handleComingSoon = (e: React.MouseEvent, feature: string) => {
    e.preventDefault();
    showNotification(`${feature} feature is coming soon!`);
    setOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="https://cdn.vectorstock.com/i/500p/73/56/exchange-revenue-dollar-arrows-cycle-icon-simple-vector-52517356.jpg" alt="XE" className="logo-img" />
            </Link>
            valendata
          </div>
          
          <div className="hamburger-wrapper">
            <Hamburger toggled={isOpen} toggle={setOpen} color="#ffffff" />
          </div>
          
          <nav className={`main-nav ${isOpen ? 'active' : ''}`}>
            <div className="nav-group">
              <Link to="/" className="nav-link" onClick={() => setOpen(false)}>Converter</Link>
              <a href="#" className="nav-link" onClick={(e) => handleComingSoon(e, "Business")}>
                Business
              </a>
            </div>
            
            <div className="nav-divider"></div>
            
            <div className="nav-group">
              <Link to="/historical-data" className="nav-link active-link" onClick={() => setOpen(false)}>
                Charts
                <MdOnlinePrediction className="active-icon" />
              </Link>
              <Link to="/currency-list" className="nav-link active-link" onClick={() => setOpen(false)}>
                Currency
                <MdOnlinePrediction className="active-icon" />
              </Link>
              <a href="#" className="nav-link" onClick={(e) => handleComingSoon(e, "Money transfers")}>
                Money transfers
              </a>
              <a href="#" className="nav-link" onClick={(e) => handleComingSoon(e, "Tools")}>
                Tools
              </a>
              <a href="#" className="nav-link" onClick={(e) => handleComingSoon(e, "Resources")}>
                Resources
              </a>
            </div>
            
            <div className="auth-buttons">
              <a href="#" className="btn btn-link" onClick={(e) => handleComingSoon(e, "Login")}>Login</a>
              <a href="#" className="btn btn-primary" onClick={(e) => handleComingSoon(e, "Registration")}>Register</a>
              <a href="#" className="btn btn-outline" onClick={(e) => handleComingSoon(e, "Contact Us")}>Contact Us</a>
            </div>
          </nav>
          
          {isOpen && <div className="menu-overlay" onClick={() => setOpen(false)}></div>}
        </div>
      </header>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </>
  );
};

export default Navbar;