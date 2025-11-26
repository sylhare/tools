import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
      <BrowserRouter basename="/tools">
        <App />
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);

