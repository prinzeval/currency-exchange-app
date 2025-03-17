import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { CurrencyContext } from '../../context/CurrencyContext';
import './HistoricalData.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HistoricalData: React.FC = () => {
  const { currencies } = useContext(CurrencyContext);
  const [baseCurrency, setBaseCurrency] = useState<string>('usd');
  const [targetCurrency, setTargetCurrency] = useState<string>('eur');
  const [history, setHistory] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>('7days');
  const [stats, setStats] = useState({
    high: 0,
    low: 0,
    average: 0,
    change: 0,
    changePercent: 0,
  });

  const calculateStats = (rates: number[]) => {
    if (rates.length === 0) return;
    
    const high = Math.max(...rates);
    const low = Math.min(...rates);
    const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    const startValue = rates[0];
    const endValue = rates[rates.length - 1];
    const change = endValue - startValue;
    const changePercent = (change / startValue) * 100;
    
    setStats({
      high: parseFloat(high.toFixed(4)),
      low: parseFloat(low.toFixed(4)),
      average: parseFloat(average.toFixed(4)),
      change: parseFloat(change.toFixed(4)),
      changePercent: parseFloat(changePercent.toFixed(2)),
    });
  };

  const getDaysInRange = (range: string) => {
    switch (range) {
      case '7days': return 7;
      case '1month': return 30;
      case '3months': return 90;
      case '6months': return 180;
      case '1year': return 365;
      default: return 7;
    }
  };

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError('');
    try {
      const daysToFetch = getDaysInRange(timeRange);
      
      const dateArray = [...Array(daysToFetch)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (daysToFetch - 1 - i));
        return date.toISOString().split('T')[0];
      });
      
      const rates = await Promise.all(
        dateArray.map(async (date) => {
          const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`;
          const response = await axios.get(apiUrl);
          return response.data[baseCurrency][targetCurrency];
        })
      );
      
      setDates(dateArray);
      setHistory(rates);
      calculateStats(rates);
    } catch (err) {
      setError('Unable to fetch historical exchange rate data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${baseCurrency.toUpperCase()} to ${targetCurrency.toUpperCase()}`,
        data: history,
        borderColor: '#0087ff',
        backgroundColor: 'rgba(0, 135, 255, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#0e1c5c',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(14, 28, 92, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return value.toFixed(4);
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className="historical-data-container">
      <div className="historical-header">
        <h2>Currency Exchange History</h2>
        <p>Track historical exchange rates and analyze currency performance over time</p>
      </div>

      <div className="currency-selection-card">
        <div className="converter-form">
          <div className="currency-input-group">
            <label className="input-label">Base Currency</label>
            <select 
              className="currency-select"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              {Object.keys(currencies).map((currency) => (
                <option key={`base-${currency}`} value={currency}>
                  {currencies[currency]} ({currency.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          
          <div className="exchange-icon" onClick={handleSwapCurrencies}>
            ↔️
          </div>
          
          <div className="currency-input-group">
            <label className="input-label">Target Currency</label>
            <select 
              className="currency-select"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              {Object.keys(currencies).map((currency) => (
                <option key={`target-${currency}`} value={currency}>
                  {currencies[currency]} ({currency.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="fetch-button" 
            onClick={fetchHistoricalData}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>
        
        <div className="time-range-selector">
          <button 
            className={`time-button ${timeRange === '7days' ? 'active' : ''}`}
            onClick={() => setTimeRange('7days')}
          >
            1 Week
          </button>
          <button 
            className={`time-button ${timeRange === '1month' ? 'active' : ''}`}
            onClick={() => setTimeRange('1month')}
          >
            1 Month
          </button>
          <button 
            className={`time-button ${timeRange === '3months' ? 'active' : ''}`}
            onClick={() => setTimeRange('3months')}
          >
            3 Months
          </button>
          <button 
            className={`time-button ${timeRange === '6months' ? 'active' : ''}`}
            onClick={() => setTimeRange('6months')}
          >
            6 Months
          </button>
          <button 
            className={`time-button ${timeRange === '1year' ? 'active' : ''}`}
            onClick={() => setTimeRange('1year')}
          >
            1 Year
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
      </div>

      {loading ? (
        <div className="chart-container">
          <div className="loading-spinner"></div>
        </div>
      ) : history.length > 0 ? (
        <div className="chart-container">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">
                {baseCurrency.toUpperCase()} to {targetCurrency.toUpperCase()} Exchange Rate
              </h3>
              <p className="chart-subtitle">
                {timeRange === '7days' ? 'Last 7 days' : 
                timeRange === '1month' ? 'Last 30 days' : 
                timeRange === '3months' ? 'Last 90 days' : 
                timeRange === '6months' ? 'Last 180 days' : 'Last 365 days'}
              </p>
            </div>
            
            <div className="chart-actions">
              <button className="chart-action-button">
                Export
              </button>
              <button className="chart-action-button" onClick={fetchHistoricalData}>
                Refresh
              </button>
            </div>
          </div>
          
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Highest Rate</div>
              <div className="stat-value">{stats.high}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Lowest Rate</div>
              <div className="stat-value">{stats.low}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Average Rate</div>
              <div className="stat-value">{stats.average}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Overall Change</div>
              <div className="stat-value">{stats.change}</div>
              <div className={`stat-trend ${stats.change >= 0 ? 'trend-up' : 'trend-down'}`}>
                {stats.changePercent}% {stats.change >= 0 ? '↑' : '↓'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chart-container">
          <div className="no-data-message">
            No historical data available. Please select currencies and fetch data.
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalData;