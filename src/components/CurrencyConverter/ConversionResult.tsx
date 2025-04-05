import React from 'react';

interface ConversionResultProps {
  result: number | null;
  error: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ 
  result, 
  error, 
  amount, 
  fromCurrency, 
  toCurrency 
}) => {
  return (
    <>
      {result && (
        <div className="result">  
          {amount} {fromCurrency.toUpperCase()} = {result.toFixed(2)} {toCurrency.toUpperCase()}
        </div>
      )}
      
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default ConversionResult;