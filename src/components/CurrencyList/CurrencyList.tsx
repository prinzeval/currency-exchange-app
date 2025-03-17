import React, { useContext, useState, useEffect } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import './CurrencyList.css';

const CurrencyList: React.FC = () => {
  const { currencies } = useContext(CurrencyContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<[string, string][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const itemsPerPage = 16;

  // Filter currencies based on search term and active filter
  useEffect(() => {
    let results = Object.entries(currencies);
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        ([code, name]) => 
          code.toLowerCase().includes(term) || 
          name.toLowerCase().includes(term)
      );
    }
    
    // Filter by region/type if not 'all'
    if (activeFilter === 'major') {
      const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
      results = results.filter(([code]) => majorCurrencies.includes(code.toUpperCase()));
    } else if (activeFilter === 'europe') {
      const europeanCurrencies = ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF'];
      results = results.filter(([code]) => europeanCurrencies.includes(code.toUpperCase()));
    } else if (activeFilter === 'asia') {
      const asianCurrencies = ['JPY', 'CNY', 'HKD', 'SGD', 'KRW', 'INR', 'TWD', 'THB', 'MYR', 'PHP', 'IDR'];
      results = results.filter(([code]) => asianCurrencies.includes(code.toUpperCase()));
    }
    
    setFilteredCurrencies(results);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [searchTerm, currencies, activeFilter]);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCurrencies.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Get flag emoji (first letter of currency code as fallback)
  const getCurrencyIndicator = (code: string) => {
    return code.charAt(0);
  };

  return (
    <div className="currency-list-container">
      <div className="currency-list-header">
        <h2>Currency Exchange</h2>
        <p>Browse our comprehensive list of international currencies for your foreign exchange needs</p>
      </div>
      
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search currency by name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filter-container">
        <button 
          className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Currencies
        </button>
        <button 
          className={`filter-button ${activeFilter === 'major' ? 'active' : ''}`}
          onClick={() => setActiveFilter('major')}
        >
          Major Currencies
        </button>
        <button 
          className={`filter-button ${activeFilter === 'europe' ? 'active' : ''}`}
          onClick={() => setActiveFilter('europe')}
        >
          European
        </button>
        <button 
          className={`filter-button ${activeFilter === 'asia' ? 'active' : ''}`}
          onClick={() => setActiveFilter('asia')}
        >
          Asian
        </button>
      </div>
      
      {filteredCurrencies.length > 0 ? (
        <div className="currency-grid">
          {currentItems.map(([code, name]) => (
            <div className="currency-card" key={code}>
              <div className="currency-flag">
                {getCurrencyIndicator(code)}
              </div>
              <div className="currency-info">
                <div className="currency-code">{code.toUpperCase()}</div>
                <div className="currency-name">{name}</div>
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
    </div>
  );
};

export default CurrencyList;