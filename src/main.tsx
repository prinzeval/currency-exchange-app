import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'flag-icons/css/flag-icons.min.css';


import { CurrencyProvider } from './context/CurrencyContext.tsx'; // Import CurrencyProvider

// Create root and render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyProvider> {/* Wrap App with CurrencyProvider */}
      <App />
    </CurrencyProvider>
  </StrictMode>,
);