import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './theme';
import reportWebVitals from './reportWebVitals';
import { ScrollTop } from './modules/shared/components';
import { AuthProvider } from './modules/auth/providers';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ThemeProvider>
        <ScrollTop>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ScrollTop>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
