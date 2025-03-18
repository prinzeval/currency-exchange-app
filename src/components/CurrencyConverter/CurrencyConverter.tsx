import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContext';
import './CurrencyConverter.css';
import { TbExchange } from "react-icons/tb";
import { FcInfo } from "react-icons/fc";
import ConverterTabs from './ConverterTabs';
import CurrencySelect from './CurrencySelect';
import ConversionResult from './ConversionResult';

const CurrencyConverter: React.FC = () => {
  const { currencies } = useContext(CurrencyContext);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('usd');
  const [toCurrency, setToCurrency] = useState<string>('jpy');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('convert');

  const convertCurrency = async () => {
    try {
      // Use the full URL for the API endpoint
      const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
      const response = await axios.get(apiUrl);
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
        <p>Leading the world in currency information and global transfers for 1M+ years</p>
      </div>
      
      <div className="converter-card">
        <ConverterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
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
                placeholder="1.00"
              />
            </div>
            
            <div className="currency-fields">
              <div className="currency-field">
                <label>From</label>
                <CurrencySelect
                  value={fromCurrency}
                  onChange={setFromCurrency}
                  currencies={currencies}
                />
              </div>
              
              <button className="swap-button" onClick={swapCurrencies}>
                <TbExchange />
              </button>
              
              <div className="currency-field">
                <label>To</label>
                <CurrencySelect
                  value={toCurrency}
                  onChange={setToCurrency}
                  currencies={currencies}
                />
              </div>
            </div>
          </div>
          
          <button className="convert-button" onClick={convertCurrency}>
            Convert
          </button>
          
          <ConversionResult 
            result={result} 
            error={error} 
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
          
          <div className="info-text">
            <span className="info-icon"><FcInfo /></span> 
            We use the mid-market rate for our Converter. This is for informational purposes only. You won't receive this rate when sending money.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;