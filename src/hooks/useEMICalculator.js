import { useState } from 'react';

const useEMICalculator = () => {
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (principal, rate, months) => {
    const monthlyRate = rate / 12 / 100;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                     (Math.pow(1 + monthlyRate, months) - 1);
    
    const roundedEMI = emiValue ? parseFloat(emiValue.toFixed(2)) : 0;
    setEmi(roundedEMI);

    let balance = principal;
    let amortSchedule = [];

    for (let i = 0; i < months; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = roundedEMI - interest;
      balance -= principalPaid;

      amortSchedule.push({
        interestPaid: interest,
        principalPaid: principalPaid,
        balance: balance > 0 ? balance : 0
      });
    }

    setSchedule(amortSchedule);
  };

  return { emi, schedule, calculateEMI };
};

export default useEMICalculator;
