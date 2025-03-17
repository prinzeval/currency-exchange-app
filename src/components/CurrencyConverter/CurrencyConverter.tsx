import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContext';
import './CurrencyConverter.css';
import { TbExchange } from "react-icons/tb";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { LuChartSpline } from "react-icons/lu";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FcInfo } from "react-icons/fc";
import 'flag-icons/css/flag-icons.min.css';
import Select from 'react-select';

const CurrencyConverter: React.FC = () => {
  const { currencies } = useContext(CurrencyContext);
  console.log('Currencies in Converter:', currencies);

  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('usd');
  const [toCurrency, setToCurrency] = useState<string>('jpy');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('convert');

  // Format the currency options with flags
  const currencyOptions = Object.keys(currencies).map(currency => ({
    value: currency,
    label: `${currency.toUpperCase()} - ${currencies[currency]}`,
    code: currency,
    countryCode: currency.substring(0, 2).toLowerCase()
  }));

  // Custom styles for react-select
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: 'none',
      height: '50px',
      '&:hover': {
        borderColor: '#bbb',
      },
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
    }),
    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: 100,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e6f0ff' : state.isFocused ? '#f0f7ff' : 'white',
      color: state.isSelected ? '#0087ff' : '#333',
      padding: '12px 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #f0f0f0',
      '&:last-child': {
        borderBottom: 'none',
      },
      '&:hover': {
        backgroundColor: '#f0f7ff',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      color: '#333',
      fontWeight: 500,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#0087ff',
      '&:hover': {
        color: '#0072db',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#333',
    }),
  };

  // Custom Option component
  const CustomOption = ({ innerProps, label, data }: any) => (
    <div {...innerProps} className="custom-option">
      <span className={`fi fi-${data.countryCode} flag-icon`} aria-hidden="true"></span>
      <span className="currency-option-label">{label}</span>
    </div>
  );

  // Custom SingleValue component (what shows when option is selected)
  const CustomSingleValue = ({ data }: any) => (
    <div className="custom-single-value">
      <span className={`fi fi-${data.countryCode} flag-icon`} aria-hidden="true"></span>
      <span className="currency-label">{data.label}</span>
    </div>
  );

  // Custom search input
  const CustomInput = ({ innerProps, ...props }: any) => (
    <div style={{ paddingLeft: '8px' }}>
      <input 
        {...innerProps} 
        {...props} 
        placeholder="Type to search..." 
        style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }}
      />
    </div>
  );

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
        <p>Leading the world in currency information and global transfers for 1M+ years</p>
      </div>
      
      <div className="converter-card">
        <div className="converter-tabs">
          <button 
            className={`tab-button ${activeTab === 'convert' ? 'active' : ''}`}
            onClick={() => setActiveTab('convert')}
          >
            <span className="icon"><TbExchange /></span> Convert
          </button>
          <button 
            className={`tab-button ${activeTab === 'send' ? 'active' : ''}`}
            onClick={() => setActiveTab('send')}
          >
            <span className="icon"><BsFillSendArrowDownFill /></span> Send
          </button>
          <button 
            className={`tab-button ${activeTab === 'charts' ? 'active' : ''}`}
            onClick={() => setActiveTab('charts')}
          >
            <span className="icon"><LuChartSpline /></span> Charts
          </button>
          <button 
            className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <span className="icon"><HiMiniBellAlert /></span> Alerts
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
                placeholder="1.00"
              />
            </div>
            
            <div className="currency-fields">
              <div className="currency-field">
                <label>From</label>
                <Select
                  value={currencyOptions.find(option => option.value === fromCurrency)}
                  onChange={(option: any) => setFromCurrency(option.value)}
                  options={currencyOptions}
                  styles={selectStyles}
                  components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue,
                    Input: CustomInput
                  }}
                  className="currency-select-container"
                  classNamePrefix="currency-select"
                  isSearchable={true}
                  placeholder="Select currency"
                />
              </div>
              
              <button className="swap-button" onClick={swapCurrencies}>
                <TbExchange />
              </button>
              
              <div className="currency-field">
                <label>To</label>
                <Select
                  value={currencyOptions.find(option => option.value === toCurrency)}
                  onChange={(option: any) => setToCurrency(option.value)}
                  options={currencyOptions}
                  styles={selectStyles}
                  components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue,
                    Input: CustomInput
                  }}
                  className="currency-select-container"
                  classNamePrefix="currency-select"
                  isSearchable={true}
                  placeholder="Select currency"
                />
              </div>
            </div>
          </div>
          
          <button className="convert-button" onClick={convertCurrency}>
            Convert
          </button>
          
          {result && (
            <div className="result">
              {amount} {fromCurrency.toUpperCase()} = {result.toFixed(2)} {toCurrency.toUpperCase()}
            </div>
          )}
          
          {error && <div className="error">{error}</div>}
          
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