import axios from 'axios';

const API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';

export interface CurrencyData {
  [key: string]: string; // Currency code to currency name
}

export interface ExchangeRates {
  [key: string]: number; // Currency code to exchange rate
}

export const fetchCurrencies = async (): Promise<CurrencyData> => {
  const response = await axios.get<CurrencyData>(`${API_BASE_URL}/currencies.json`);
  return response.data;
};

export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRates> => {
  const response = await axios.get<{ [key: string]: ExchangeRates }>(
    `${API_BASE_URL}/currencies/${baseCurrency}.json`
  );
  return response.data[baseCurrency];
};

export const fetchHistoricalRates = async (baseCurrency: string, date: string): Promise<ExchangeRates> => {
  const response = await axios.get<{ [key: string]: ExchangeRates }>(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`
  );
  return response.data[baseCurrency];
};