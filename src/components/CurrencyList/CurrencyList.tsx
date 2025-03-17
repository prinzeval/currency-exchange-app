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
    
    // Filter by region/type
    switch (activeFilter) {
      case 'major':
        const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
        results = results.filter(([code]) => majorCurrencies.includes(code.toUpperCase()));
        break;
      case 'europe':
        const europeanCurrencies = ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF'];
        results = results.filter(([code]) => europeanCurrencies.includes(code.toUpperCase()));
        break;
      case 'asia':
        const asianCurrencies = ['JPY', 'CNY', 'HKD', 'SGD', 'KRW', 'INR', 'TWD', 'THB', 'MYR', 'PHP', 'IDR'];
        results = results.filter(([code]) => asianCurrencies.includes(code.toUpperCase()));
        break;
      case 'africa':
        const africanCurrencies = ['ZAR', 'EGP', 'NGN', 'KES', 'GHS', 'MAD', 'TND', 'XOF', 'XAF'];
        results = results.filter(([code]) => africanCurrencies.includes(code.toUpperCase()));
        break;
      case 'south-america':
        const southAmericanCurrencies = ['BRL', 'ARS', 'CLP', 'COP', 'PEN', 'VES', 'UYU', 'PYG'];
        results = results.filter(([code]) => southAmericanCurrencies.includes(code.toUpperCase()));
        break;
      case 'other':
        const otherCurrencies = ['NZD', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR'];
        results = results.filter(([code]) => otherCurrencies.includes(code.toUpperCase()));
        break;
      default:
        // No filter applied
        break;
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
  
  // Get region/country for each currency code
  const getCurrencyRegion = (code: string): string => {
    const regions: Record<string, string> = {
      'USD': 'United States',
      'EUR': 'European Union',
      'GBP': 'United Kingdom',
      'JPY': 'Japan',
      'AUD': 'Australia',
      'CAD': 'Canada',
      'CHF': 'Switzerland',
      'CNY': 'China',
      // Add more mappings as needed
    };
    
    return regions[code.toUpperCase()] || 'International';
  };

  // Get flag URL for a currency
  const getFlagUrl = (code: string): string => {
    // This is a simplified mapping - in a real application, you'd have proper flag images
    const flagMapping: Record<string, string> = {
      'EUR': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAyNCI+PHJlY3Qgd2lkdGg9IjM2IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMDM5Ii8+PGcgZmlsbD0iI2ZmMCI+PHBhdGggZD0iTTE4IDQgbDEuMSAzLjQgaDMuNmwtMi45IDIuMSAxLjEgMy40LTIuOS0yLjEtMi45IDIuMSAxLjEtMy40LTIuOS0yLjFoMy42eiIvPjxwYXRoIGQ9Ik0xOCA4IGwxLjEgMy40IGgzLjZsLTIuOSAyLjEgMS4xIDMuNC0yLjktMi4xLTIuOSAyLjEgMS4xLTMuNC0yLjktMi4xaDMuNnoiLz48cGF0aCBkPSJNMTMgMTAgbDEuMSAzLjQgaDMuNmwtMi45IDIuMSAxLjEgMy40LTIuOS0yLjEtMi45IDIuMSAxLjEtMy40LTIuOS0yLjFoMy42eiIvPjxwYXRoIGQ9Ik0yMyAxMCBsMS4xIDMuNCBoMy42bC0yLjkgMi4xIDEuMSAzLjQtMi45LTIuMS0yLjkgMi4xIDEuMS0zLjQtMi45LTIuMWgzLjZ6Ii8+PHBhdGggZD0iTTggMTAgbDEuMSAzLjQgaDMuNmwtMi45IDIuMSAxLjEgMy40LTIuOS0yLjEtMi45IDIuMSAxLjEtMy40LTIuOS0yLjFoMy42eiIvPjxwYXRoIGQ9Ik0yOCAxMCBsMS4xIDMuNCBoMy42bC0yLjkgMi4xIDEuMSAzLjQtMi45LTIuMS0yLjkgMi4xIDEuMS0zLjQtMi45LTIuMWgzLjZ6Ii8+PHBhdGggZD0iTTE4IDEyIGwxLjEgMy40IGgzLjZsLTIuOSAyLjEgMS4xIDMuNC0yLjktMi4xLTIuOSAyLjEgMS4xLTMuNC0yLjktMi4xaDMuNnoiLz48cGF0aCBkPSJNMTggMTYgbDEuMSAzLjQgaDMuNmwtMi45IDIuMSAxLjEgMy40LTIuOS0yLjEtMi45IDIuMSAxLjEtMy40LTIuOS0yLjFoMy42eiIvPjxwYXRoIGQ9Ik0xMyAxNiBsMS4xIDMuNCBoMy42bC0yLjkgMi4xIDEuMSAzLjQtMi45LTIuMS0yLjkgMi4xIDEuMS0zLjQtMi45LTIuMWgzLjZ6Ii8+PHBhdGggZD0iTTIzIDE2IGwxLjEgMy40IGgzLjZsLTIuOSAyLjEgMS4xIDMuNC0yLjktMi4xLTIuOSAyLjEgMS4xLTMuNC0yLjktMi4xaDMuNnoiLz48cGF0aCBkPSJNOCAxNiBsMS4xIDMuNCBoMy42bC0yLjkgMi4xIDEuMSAzLjQtMi45LTIuMS0yLjkgMi4xIDEuMS0zLjQtMi45LTIuMWgzLjZ6Ii8+PHBhdGggZD0iTTI4IDE2IGwxLjEgMy40IGgzLjZsLTIuOSAyLjEgMS4xIDMuNC0yLjktMi4xLTIuOSAyLjEgMS4xLTMuNC0yLjktMi4xaDMuNnoiLz48L2c+PC9zdmc+',
      // Add more flag mappings for other currencies
    };
    
    // Return a placeholder flag for currencies without a specific mapping
    return flagMapping[code.toUpperCase()] || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAyNCI+PHJlY3Qgd2lkdGg9IjM2IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iMTgiIHk9IjEyIiBzdHlsZT0iZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgZG9taW5hbnQtYmFzZWxpbmU6IG1pZGRsZTsgdGV4dC1hbmNob3I6IG1pZGRsZTsiIGZpbGw9IiM2NjY2NjYiPnt9PC90ZXh0Pjwvc3ZnPg==';
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
        <button 
          className={`filter-button ${activeFilter === 'africa' ? 'active' : ''}`}
          onClick={() => setActiveFilter('africa')}
        >
          African
        </button>
        <button 
          className={`filter-button ${activeFilter === 'south-america' ? 'active' : ''}`}
          onClick={() => setActiveFilter('south-america')}
        >
          South American
        </button>
        <button 
          className={`filter-button ${activeFilter === 'other' ? 'active' : ''}`}
          onClick={() => setActiveFilter('other')}
        >
          Other
        </button>
      </div>
      
      {filteredCurrencies.length > 0 ? (
        <div className="currency-grid">
          {currentItems.map(([code, name]) => (
            <div className="currency-card-container" key={code}>
              <div className="flag-container">
                <img 
                  className="flag" 
                  src={getFlagUrl(code)} 
                  alt={`${code} flag`} 
                />
              </div>
              <div className="currency-card">
                <h2 className="currency-code">{code.toUpperCase()}</h2>
                <p className="currency-name">{name}</p>
                <p className="currency-region">{getCurrencyRegion(code)}</p>
                
                <div className="actions">
                  <a href="#" className="rates-link">
                    <svg className="rates-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                    </svg>
                    {code} rates
                  </a>
                  <button className="buy-button">Buy {code}</button>
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
    </div>
  );
};

export default CurrencyList;