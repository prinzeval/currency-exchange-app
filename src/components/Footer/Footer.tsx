import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li><Link to="/security-center">Security Centre</Link></li>
            <li><Link to="/card-services/lost-card">Report Lost Card</Link></li>
            <li><Link to="/support/complaints">Feedback & Complaints</Link></li>
            <li><Link to="/tools/calculators">Financial Calculators</Link></li>
            <li><Link to="/banking/cut-off-times">Transaction Cut-off Times</Link></li>
            <li><Link to="/customer-review">Customer Review - KYC</Link></li>
            <li><Link to="/legal/dispute-resolution">Dispute Resolution</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Digital Banking</h3>
          <ul>
            <li><Link to="/digital/mobile-products">Mobile Banking Products</Link></li>
            <li><Link to="/digital/wallets">Digital Payment Solutions</Link></li>
            <li><Link to="/locations/atm">ATM Network</Link></li>
            <li><Link to="/digital/online-banking">Online Banking Portal</Link></li>
            <li><Link to="/digital/mobile-app">Mobile Application</Link></li>
            <li><Link to="/digital/account-recovery">Account Recovery</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><Link to="/legal/cookie-policy">Cookie Policy</Link></li>
            <li><Link to="/services/auctions">Property Auctions</Link></li>
            <li><Link to="/rates/exchange">Foreign Exchange Rates</Link></li>
            <li><Link to="/investor-relations">Investor Relations</Link></li>
            <li><Link to="/rates/service-charges">Service Charges</Link></li>
            <li><Link to="/documents/fee-information">Fee Information Documents</Link></li>
            <li><Link to="/rates/base-rates">Interest Base Rates</Link></li>
            <li><Link to="/legal/arrears-management">Arrears Management Policy</Link></li>
            <li><Link to="/legal/data-protection">Data Protection</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <div className="support-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h4>Customer Support Center</h4>
            <p>Get assistance with your banking needs</p>
          </div>
          
          <div className="support-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h4>Schedule an Appointment</h4>
            <p>Meet with our banking specialists</p>
          </div>
          
          <div className="support-card">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h4>Contact Information</h4>
            <p>8000 9999 or +357 22500500</p>
            <p className="hours">Monday - Friday: 07:45 - 18:00</p>
            <p className="hours">Saturday: 09:00 - 14:00</p>
            <p className="note">(Excluding bank holidays)</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/legal">Legal Notices</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/cookies">Cookie Preferences</Link>
        </div>
        
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>
      
      <div className="copyright">
        <p>© {new Date().getFullYear()} Banking Institution. All rights reserved.</p>
        <p>Licensed by the Central Bank. Authorized Financial Institution.</p>
      </div>
    </footer>
  );
};

export default Footer;