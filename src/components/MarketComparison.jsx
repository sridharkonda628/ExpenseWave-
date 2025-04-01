// src/components/MarketComparison.jsx
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { useExpense } from '../context/ExpenseContext';
import { useState, useEffect } from 'react';

const marketAverages = {
  food: 300,
  transport: 200,
  housing: 1200,
  entertainment: 150,
  utilities: 250
};

const MarketComparison = () => {
  const { expenses } = useExpense();
  
  const userAverages = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});


  // Add to MarketComparison.jsx
const [liveMarketData, setLiveMarketData] = useState(null);

useEffect(() => {
  // This would actually connect to an API in production
  const fetchMarketData = async () => {
    const mockData = {
      food: 300 * (1 + Math.random() * 0.2),
      transport: 200 * (1 + Math.random() * 0.15),
      // ... other categories
    };
    setLiveMarketData(mockData);
  };
  fetchMarketData();
  const interval = setInterval(fetchMarketData, 60000);
  return () => clearInterval(interval);
}, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Market Comparison</Typography>
      {Object.entries(marketAverages).map(([category, marketAvg]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography variant="body1">
            {category.toUpperCase()}
          </Typography>
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(
                  ((userAverages[category] || 0) / marketAvg * 100), 
                  200
                )} 
                // Enhanced MarketComparison.jsx progress bars
color={
    (userAverages[category] || 0) > marketAvg * 1.2
      ? 'error'
      : (userAverages[category] || 0) > marketAvg
      ? 'warning'
      : 'success'
  }
              />
            </Box>
            <Typography variant="body2">
              ${userAverages[category]?.toFixed(2) || 0} / ${marketAvg}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};
export default MarketComparison;