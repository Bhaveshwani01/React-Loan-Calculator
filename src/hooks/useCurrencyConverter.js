import { useEffect, useState } from 'react';
import axios from 'axios';

const useCurrencyConverter = (base = 'INR') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = '9b3f10affc93a409f71cc4bf'; // Replace this with your actual key
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(url);
        if (response.data.result === 'error') {
          setError('Invalid API Key or API limit exceeded.');
        } else {
          setRates(response.data.conversion_rates);
        }
      } catch (err) {
        setError('Failed to fetch currency rates. Please check your API key and network connection.');
      } finally {
        setLoading(false);
      }
    };

    if (API_KEY !== 'YOUR_API_KEY') {
      fetchRates();
    } else {
      setError('API Key is missing or invalid.');
      setLoading(false);
    }
  }, [url, API_KEY]);

  return { rates, loading, error };
};

export default useCurrencyConverter;
