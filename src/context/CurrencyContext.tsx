import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CurrencyContextType {
  currencies: { [key: string]: string };
}

export const CurrencyContext = createContext<CurrencyContextType>({ currencies: {} });

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        console.log('Fetched Currencies:', response.data);
        setCurrencies(response.data);
      } catch (err) {
        console.error('Error fetching currencies:', err);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};