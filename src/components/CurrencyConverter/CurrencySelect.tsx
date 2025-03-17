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

  // Custom components for the select
  const CustomOption = ({ innerProps, data }: any) => (
    <div {...innerProps} className="currency-option">
      <span className={`fi fi-${data.countryCode}`}></span>
      <span className="currency-code">{data.label}</span>
      <span className="currency-name">{data.name}</span>
    </div>
  );

  const CustomSingleValue = ({ data }: any) => (
    <div className="currency-single-value">
      <span className={`fi fi-${data.countryCode}`}></span>
      <span className="currency-code">{data.label}</span>
    </div>
  );

  return (
    <div className="currency-select-wrapper">
      <Select
        value={currencyOptions.find(option => option.value === value)}
        onChange={(option: any) => onChange(option.value)}
        options={currencyOptions}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue
        }}
        className="currency-select"
        classNamePrefix="currency-select"
        isSearchable={true}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CurrencySelect;