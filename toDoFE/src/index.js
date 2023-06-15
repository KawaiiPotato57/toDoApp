import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './assets/index.css';
import App from './App';
import NotFound from './components/NotFound';
import ServerError from './error-handlers/ServerError';
const ErrorFallbackUI = <div>Server error. Please try again later.</div>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/* <ServerError fallbackUI={ErrorFallbackUI}> */}
     <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </Router>
    {/* </ServerError> */}
  </React.StrictMode>
);


