import React from 'react';
import Select from 'react-select';
import 'flag-icons/css/flag-icons.min.css';

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  currencies: Record<string, string>;
  placeholder?: string;
  type?: 'from' | 'to';
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ 
  value, 
  onChange, 
  currencies,
  placeholder = "Select currency",
  type = 'from'
}) => {
  // Format the currency options with flags
  const currencyOptions = Object.keys(currencies).map(currency => {
    // Extract country code for flag (first 2 letters of currency code)
    const countryCode = currency.substring(0, 2).toLowerCase();
    
    return {
      value: currency,
      label: currency.toUpperCase(),
      name: currencies[currency],
      countryCode
    };
  });

  // Custom styles for react-select
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused ? '2px solid #0087ff' : '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 135, 255, 0.1)' : 'none',
      minHeight: '48px',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
      padding: '0 4px',
      '&:hover': {
        borderColor: '#0087ff',
      },
      transition: 'all 0.2s ease',
    }),
    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: 9999,
      marginTop: '8px',
      border: '1px solid #f0f0f0',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '0',
      maxHeight: '300px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f0f7ff' : state.isFocused ? '#f5f8fa' : 'white',
      color: '#333',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid #f5f5f5',
      '&:hover': {
        backgroundColor: '#f5f8fa',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#333',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#888',
      padding: '0 8px',
      '&:hover': {
        color: '#0087ff',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '2px 8px',
    }),
  };

  // Custom Option component
  const CustomOption = ({ innerProps, data }: any) => (
    <div {...innerProps} className="currency-option">
      <span 
        className={`fi fi-${data.countryCode}`} 
        style={{ 
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          borderRadius: '2px'
        }}
      ></span>
      <span className="currency-code">{data.label}</span>
      <span className="currency-name">{data.name}</span>
    </div>
  );

  // Custom SingleValue component (what shows when option is selected)
  const CustomSingleValue = ({ data }: any) => (
    <div className="currency-single-value">
      <span 
        className={`fi fi-${data.countryCode}`} 
        style={{ 
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          borderRadius: '2px'
        }}
      ></span>
      <span className="currency-code">{data.label}</span>
    </div>
  );

  return (
    <div className="currency-select-wrapper">
      <Select
        value={currencyOptions.find(option => option.value === value)}
        onChange={(option: any) => onChange(option.value)}
        options={currencyOptions}
        styles={selectStyles}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue
        }}
        className="currency-select"
        classNamePrefix="currency-select"
        isSearchable={true}
        placeholder={placeholder}
        menuPosition="fixed"
        menuPlacement="auto"
      />
    </div>
  );
};

export default CurrencySelect;