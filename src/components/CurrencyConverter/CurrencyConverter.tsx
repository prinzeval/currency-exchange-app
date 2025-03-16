import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContext';
import './CurrencyConverter.css';
import { TbExchange } from "react-icons/tb";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { LuChartSpline } from "react-icons/lu";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FcInfo } from "react-icons/fc";



const CurrencyConverter: React.FC = () => {
  const { currencies } = useContext(CurrencyContext);
  console.log('Currencies in Converter:', currencies);

  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('usd');
  const [toCurrency, setToCurrency] = useState<string>('jpy');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('convert');

  const convertCurrency = async () => {
    try {
      const apiUrl = `/api/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
      console.log('Fetching exchange rates from:', apiUrl);
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data);
      const rate = response.data[fromCurrency][toCurrency];
      if (!rate) throw new Error('Invalid currency code');
      setResult(amount * rate);
      setError('');
    } catch (err) {
      setError('Error converting currency. Please try again.');
      console.error(err);
    }
  };

  // Function to swap currencies
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="converter-container">
      <div className="hero-section">
        <h1>Global currency conversions & money transfers</h1>
        <p>Leading the world in currency information and global transfers for 30+ years</p>
      </div>
      
      <div className="converter-card">
        <div className="converter-tabs">
          <button 
            className={`tab-button ${activeTab === 'convert' ? 'active' : ''}`}
            onClick={() => setActiveTab('convert')}
          >
            <span className="icon"><TbExchange /></span> Convert
            
            Convert
          </button>
          <button 
            className={`tab-button ${activeTab === 'send' ? 'active' : ''}`}
            onClick={() => setActiveTab('send')}
          >
            <span className="icon"><BsFillSendArrowDownFill />
            </span> Send
          </button>
          <button 
            className={`tab-button ${activeTab === 'charts' ? 'active' : ''}`}
            onClick={() => setActiveTab('charts')}
          >
            <span className="icon"><LuChartSpline />
            </span> Charts
          </button>
          <button 
            className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <span className="icon"><HiMiniBellAlert />
            </span> Alerts
          </button>
        </div>
        
        <div className="converter-content">
          <div className="input-section">
            <div className="amount-field">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                min="0.01"
                step="0.01"
                className="amount-input"
              />
            </div>
            
            <div className="currency-fields">
              <div className="currency-field">
                <label>From</label>
                <div className="currency-select">
                  <div className="flag">🇺🇸</div>
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {Object.keys(currencies).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency.toUpperCase()} - {currencies[currency]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button className="swap-button" onClick={swapCurrencies}><TbExchange />  </button>
              
              <div className="currency-field">
                <label>To</label>
                <div className="currency-select">
                  <div className="flag">🇯🇵</div>
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {Object.keys(currencies).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency.toUpperCase()} - {currencies[currency]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <button className="convert-button" onClick={convertCurrency}>
            Convert
          </button>
          
          {result && (
            <p className="result">
              {amount} {fromCurrency.toUpperCase()} = {result.toFixed(2)} {toCurrency.toUpperCase()}
            </p>
          )}
          
          {error && <p className="error">{error}</p>}
          
          <div className="info-text">
            <span className="info-icon"><FcInfo />
            </span> We use the mid-market rate for our Converter. This is for informational purposes only. You won't receive this rate when sending money. 
            <a href="/login" className="login-link">Login to view send rates</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;