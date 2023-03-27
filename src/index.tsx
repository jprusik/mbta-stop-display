import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import 'i18n';
import reportWebVitals from 'reportWebVitals';
import {App} from 'components/App';
import {ContextProviders} from 'components/ContextProviders';
import {TranslatedErrorBoundary as ErrorBoundary} from 'components/ErrorBoundary';

const darkTheme = createTheme({
  // Globally disable MUI transitions
  transitions: { create: () => 'none' },
  palette: {
    mode: 'dark',
    background: {
      default: '#0A1929'
    },
    warning: {
      main: '#FFC107',
      dark: '#EEB400'
    },
    info: {
      main: '#2086D7',
      dark: '#1769AA'
    }
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Note: the use of `StrictMode` in React 18 will cause fetch to fire twice on mount when in development (only): https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <ContextProviders>
          <App />
        </ContextProviders>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
