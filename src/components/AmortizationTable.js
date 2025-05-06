import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AmortizationTable = ({ schedule, currency }) => {
  if (!schedule || schedule.length === 0) return null;

  return (
    <Paper sx={{ marginTop: 4, padding: 2 }}>
      <Typography variant="h6" gutterBottom>Amortization Schedule</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Principal Paid</TableCell>
            <TableCell>Interest Paid</TableCell>
            <TableCell>Remaining Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>₹{row.principalPaid.toFixed(2)}{currency}</TableCell>
              <TableCell>₹{row.interestPaid.toFixed(2)}{currency}</TableCell>
              <TableCell>₹{row.balance.toFixed(2)}{currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AmortizationTable;
