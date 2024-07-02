import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import App from './App.tsx';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
);
