import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar/Navbar';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import HistoricalData from './components/HistoricalData/HistoricalData';
import CurrencyList from './components/CurrencyList/CurrencyList';
import Footer from './components/Footer/Footer';
import { CurrencyProvider } from './context/CurrencyContext';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <CurrencyProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<CurrencyConverter />} />
            <Route path="/historical-data" element={<HistoricalData />} />
            <Route path="/currency-list" element={<CurrencyList />} />
          </Routes>
          <Footer />
        </div>
      </CurrencyProvider>
    </Router>
  );
};

export default App;