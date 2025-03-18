import React from 'react';
import { FaChartLine, FaExchangeAlt, FaListAlt } from 'react-icons/fa';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-container">
      {/* Hero Heading */}
      <div className="hero-heading">
        <h1 className="hero-title">
          3 Ways to Convert Currencies<br />With Valendata
        </h1>
        <p className="hero-subtitle">
          Exchanging currencies? You choose how.
        </p>
      </div>
      
      {/* Features Section */}
      <div className="features-container">
        {/* Feature 1 */}
        <div className="feature-card">
          <div className="feature-icon">
            <FaChartLine />
          </div>
          <h2 className="feature-title">
            Exchange rates history
          </h2>
          <p className="feature-description">
            Track currency trends with detailed historical charts and make informed decisions based on market movements.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="feature-card">
          <div className="feature-icon">
            <FaExchangeAlt />
          </div>
          <h2 className="feature-title">
            Currency exchange
          </h2>
          <p className="feature-description">
            Convert between 70+ currencies with competitive rates, all within our simple and intuitive interface.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="feature-card">
          <div className="feature-icon">
            <FaListAlt />
          </div>
          <h2 className="feature-title">
            Currency list
          </h2>
          <p className="feature-description">
            Access our comprehensive list of available currencies with real-time rates and detailed information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;