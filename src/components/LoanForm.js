import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const LoanForm = ({ onCalculate }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!principal || !rate || !months) return;

    onCalculate({
      principal: parseFloat(principal),
      rate: parseFloat(rate),
      months: parseInt(months),
    });
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Loan EMI Calculator</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Principal Amount (₹)"
              fullWidth
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Annual Interest Rate (%)"
              fullWidth
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Loan Duration (months)"
              fullWidth
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Calculate EMI</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoanForm;
