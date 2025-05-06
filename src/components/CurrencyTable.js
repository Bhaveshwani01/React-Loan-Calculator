import React, { useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Typography,
  Paper,
  Button,
  Box,
} from '@mui/material';

const CurrencyTable = ({ emi, rates, loading, error }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Show loading or error messages
  if (loading) return <Typography>Loading exchange rates...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!rates || Object.keys(rates).length === 0)
    return <Typography>No exchange rate data available</Typography>;

  // Allowed currencies only
  const allowedCurrencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleReset = () => {
    setSelectedCurrency('INR');
  };

  <Typography variant="h6" sx={{ mt: 2 }}>
  Monthly EMI: {emi.toFixed(2)} {selectedCurrency}
</Typography>

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">EMI in Selected Currency</Typography>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <FormControl fullWidth>
        <InputLabel>Currency</InputLabel>
        <Select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          label="Currency"
        >
          {allowedCurrencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="body1" sx={{ mt: 3 }}>
        {selectedCurrency}: {(emi * rates[selectedCurrency]).toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default CurrencyTable;
