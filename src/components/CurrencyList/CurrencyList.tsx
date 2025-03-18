import React, { useState, useEffect } from 'react';
import './CurrencyList.css';
import 'flag-icons/css/flag-icons.min.css';

// Define types
type Currency = {
  code: string;
  name: string;
  region: string;
};

type CurrencyMap = {
  [key: string]: string;
};

// This data could come from another API endpoint in a real implementation
const currencyRegionMap: Record<string, string[]> = {
  'asia': [
    'jpy', 'cny', 'hkd', 'sgd', 'krw', 'inr', 'twd', 'thb', 'myr', 'idr', 
    'php', 'vnd', 'bdt', 'pkr', 'lkr', 'npr', 'mmk', 'kzt', 'bhd', 'kwd', 
    'omr', 'qar', 'sar', 'aed', 'ils', 'jod', 'lbp', 'iqd', 'irr', 'syp', 
    'khr', 'lak', 'mnt', 'bnd', 'mop', 'mvr', 'afn', 'bdt', 'btn', 'kgs', 
    'kpw'
  ],
  'europe': [
    'eur', 'gbp', 'chf', 'nok', 'sek', 'dkk', 'pln', 'czk', 'huf', 'bgn', 
    'ron', 'hrk', 'rsd', 'all', 'bam', 'isk', 'mdl', 'mkd', 'rub', 'uah', 
    'byn', 'try', 'gel'
  ],
  'americas': [
    'usd', 'cad', 'mxn', 'brl', 'ars', 'clp', 'cop', 'pen', 'uyu', 'vef', 
    'bsd', 'bbd', 'kyd', 'dop', 'jmd', 'ttd', 'xcd', 'pyg', 'hnl', 'nio',
    'gtq', 'bzd', 'crc', 'pab', 'srd', 'gyd'
  ],
  'africa': [
    'zar', 'egp', 'ngn', 'ghc', 'mad', 'dzd', 'tnd', 'zmw', 'bwp', 'mur',
    'nad', 'kes', 'ugx', 'tzs', 'cdf', 'xof', 'xaf', 'scr', 'rwf', 'etb',
    'mga', 'sll', 'sdg', 'lyd', 'gmd', 'gnf', 'mwk', 'szl'
  ],
  'oceania': [
    'aud', 'nzd', 'fjd', 'pgk', 'top', 'wst', 'vuv', 'sbf'
  ],
  'crypto': [
    'btc', 'eth', 'usdt', 'bnb', 'xrp', 'ada', 'sol', 'dot', 'doge', 'ltc',
    'shib', 'usdc', 'busd', 'wbtc', 'dai', 'matic', 'avax'
  ],
  'metals': [
    'xau', 'xag', 'xpt', 'xpd'
  ]
};

// Special currency icons for non-flag currencies
const specialCurrencyIcons: Record<string, string> = {
  'btc': '₿',
  'eth': 'Ξ',
  'xrp': '✕',
  'xau': 'Au',
  'xag': 'Ag',
  'xpt': 'Pt',
  'xpd': 'Pd',
  // Add more symbols as needed
};

const CurrencyList: React.FC = () => {
  // const [allCurrencies, setAllCurrencies] = useState<CurrencyMap>({});
  
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const regions = [
    { code: 'all', name: 'All Regions' },
    { code: 'asia', name: 'Asia' },
    { code: 'europe', name: 'Europe' },
    { code: 'americas', name: 'Americas' },
    { code: 'africa', name: 'Africa' },
    { code: 'oceania', name: 'Oceania' },
    { code: 'crypto', name: 'Cryptocurrencies' },
    { code: 'metals', name: 'Precious Metals' },
    { code: 'other', name: 'Other' }
  ];

  // Fetch currencies from the API
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        // Try primary URL first with fallback
        let response;
        try {
          response = await fetch(`${import.meta.env.VITE_CURRENCY_API_URL}/currencies.json`);
        } catch (err) {
          response = await fetch(`${import.meta.env.VITE_FALLBACK_CURRENCY_API_URL}/currencies.json`);
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }
        
        const data: CurrencyMap = await response.json();
        
        // Process currencies with dynamic region assignment
        const currencyList: Currency[] = Object.entries(data).map(([code, name]) => {
          // Determine region based on the code
          let region = 'other';
          
          // Check each region's currency list
          for (const [regionName, currencyCodes] of Object.entries(currencyRegionMap)) {
            if (currencyCodes.includes(code.toLowerCase())) {
              region = regionName;
              break;
            }
          }
          
          return {
            code,
            name: name as string,
            region
          };
        });
                
        setCurrencies(currencyList);
        setFilteredCurrencies(currencyList);
      } catch (err) {
        setError('Error fetching currency data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  // Filter currencies based on search term and selected region
  useEffect(() => {
    let results = currencies;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(currency => 
        currency.code.toLowerCase().includes(term) || 
        currency.name.toLowerCase().includes(term)
      );
    }
    
    // Filter by region
    if (selectedRegion !== 'all') {
      results = results.filter(currency => currency.region === selectedRegion);
    }
    
    setFilteredCurrencies(results);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, selectedRegion, currencies]);

  // Get flag class for a currency
  const getFlagClass = (currencyCode: string): string => {
    const countryCode = currencyCode.substring(0, 2).toLowerCase();
    
    // Skip special currencies where the first two letters won't represent a valid country code
    if (currencyCode.toLowerCase().startsWith('x') || 
        ['btc', 'eth', 'bnb', 'usdt', 'usdc', 'doge', 'ltc', 'dai'].includes(currencyCode.toLowerCase())) {
      return '';
    }
    
    return `fi fi-${countryCode}`;
  };

  // Check if currency should use an icon instead of a flag
  const shouldUseIcon = (currencyCode: string): boolean => {
    // Cryptocurrencies and precious metals usually don't have country flags
    return currencyCode.toLowerCase().startsWith('x') || 
           ['btc', 'eth', 'bnb', 'usdt', 'usdc', 'doge', 'ltc', 'dai', 'matic', 'avax'].includes(currencyCode.toLowerCase());
  };

  // Get currency icon for non-country currencies (crypto, metals)
  const getCurrencyIcon = (currencyCode: string): string => {
    return specialCurrencyIcons[currencyCode.toLowerCase()] || currencyCode.toUpperCase();
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  // Handle region selection change
  // const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedRegion(e.target.value);
  // };

  
  // Calculate current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCurrencies.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="currency-list-container">
      <div className="currency-list-header">
        <h2>Currency Explorer</h2>
        <p>Browse our comprehensive list of international currencies for your foreign exchange needs</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search currency by name or code..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-container">
        {regions.map(region => (
          <button 
            key={region.code}
            className={`filter-button ${selectedRegion === region.code ? 'active' : ''}`}
            onClick={() => setSelectedRegion(region.code)}
          >
            {region.name}
          </button>
        ))}
      </div>

      {/* Region statistics */}
      <div className="region-stats">
        <h3>Region Statistics</h3>
        <div className="stats-grid">
          {regions.slice(0, -1).map(region => {
            const count = region.code === 'all' 
              ? currencies.length 
              : currencies.filter(c => c.region === region.code).length;
            
            return (
              <div 
                key={region.code} 
                className={`stat-card ${selectedRegion === region.code ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region.code)}
              >
                <div className="stat-count">{count}</div>
                <div className="stat-label">{region.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading currencies...</div>
      ) : (
        <>
          <div className="results-count">
            {filteredCurrencies.length} currencies found
          </div>
          
          {filteredCurrencies.length > 0 ? (
            <div className="currency-grid">
              {currentItems.map((currency) => (
                <div className="currency-card-container" key={currency.code}>
                  <div className="flag-container">
                    {!shouldUseIcon(currency.code) ? (
                      <span className={getFlagClass(currency.code)}></span>
                    ) : (
                      <div className="currency-icon">{getCurrencyIcon(currency.code)}</div>
                    )}
                  </div>
                  <div className="currency-card">
                    <h2 className="currency-code">{currency.code.toUpperCase()}</h2>
                    <p className="currency-name">{currency.name}</p>
                    <p className="currency-region capitalize">{currency.region}</p>
                    
                    <div className="actions">
                      <a href="#" className="rates-link">
                        <svg className="rates-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                        </svg>
                        {currency.code.toUpperCase()} rates
                      </a>
                      <button className="buy-button">Buy {currency.code.toUpperCase()}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              No currencies found matching your search.
            </div>
          )}
          
          {/* Pagination */}
          {filteredCurrencies.length > itemsPerPage && (
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredCurrencies.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrencyList;