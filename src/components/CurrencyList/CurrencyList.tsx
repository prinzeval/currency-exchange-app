import React, { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import './CurrencyList.css';

const CurrencyList: React.FC = () => {
  const { currencies } = useContext(CurrencyContext);

  return (
    <div className="currency-list">
      <h2>Available Currencies</h2>
      <ul>
        {Object.entries(currencies).map(([code, name]) => (
          <li key={code}>
            <strong>{code.toUpperCase()}</strong>: {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyList;