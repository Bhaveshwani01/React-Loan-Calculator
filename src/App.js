import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoanForm from './components/LoanForm';
import AmortizationTable from './components/AmortizationTable';
import CurrencyTable from './components/CurrencyTable';
import useEMICalculator from './hooks/useEMICalculator';
import useCurrencyConverter from './hooks/useCurrencyConverter';
import { Typography, Button, CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function App() {
  const { emi, schedule, calculateEMI } = useEMICalculator();
  const { rates, loading, error, selectedCurrency, setSelectedCurrency } = useCurrencyConverter('INR');
  const { theme, toggleTheme } = useTheme();

  const muiTheme = createTheme({
    palette: { mode: theme },
  });

  const handleEMICalculate = ({ principal, rate, months }) => {
    calculateEMI(principal, rate, months);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <div style={{ padding: '20px' }}>
            <Button variant="contained" onClick={toggleTheme} sx={{ marginBottom: 2 }}>
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>

            <LoanForm onCalculate={handleEMICalculate} />
            {emi !== null && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Monthly EMI: {emi.toFixed(2)} {selectedCurrency}
                </Typography>
                <CurrencyTable
                  emi={emi}
                  rates={rates}
                  loading={loading}
                  error={error}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
                />
                <AmortizationTable schedule={schedule} currency={selectedCurrency} />
              </>
            )}
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
