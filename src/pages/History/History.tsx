import React from 'react';
import HistoricalChart from '../../components/HistoricalData/HistoricalData';

const History: React.FC = () => (
  <div>
    <h1>Historical Data</h1>
    <HistoricalChart baseCurrency="usd" targetCurrency="eur" />
  </div>
);

export default History;