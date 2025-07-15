import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Keep this for Tailwind CSS
import App from './App'; // Make sure this imports your App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);