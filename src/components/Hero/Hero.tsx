import React, { useState, useEffect } from 'react';

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

const Hero: React.FC = () => {
  const [allCurrencies, setAllCurrencies] = useState<CurrencyMap>({});
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
          response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        } catch (err) {
          response = await fetch('https://latest.currency-api.pages.dev/v1/currencies.json');
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch currencies');
        }
        
        const data: CurrencyMap = await response.json();
        setAllCurrencies(data);
        
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
  }, [searchTerm, selectedRegion, currencies]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle region selection change
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Currency Explorer</h1>
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">{error}</div>}
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by currency name or code..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Region filter */}
        <div className="w-full md:w-48">
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            {regions.map(region => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Region statistics */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Region Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {regions.slice(0, -1).map(region => {
            const count = region.code === 'all' 
              ? currencies.length 
              : currencies.filter(c => c.region === region.code).length;
            
            return (
              <div 
                key={region.code} 
                className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:bg-blue-50"
                onClick={() => setSelectedRegion(region.code)}
              >
                <div className="text-lg font-bold">{count}</div>
                <div className="text-sm text-gray-600">{region.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading currencies...</div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            {filteredCurrencies.length} currencies found
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <tr key={currency.code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{currency.code.toUpperCase()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{currency.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{currency.region}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      No currencies found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;