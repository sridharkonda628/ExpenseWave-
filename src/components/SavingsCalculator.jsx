
import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Slider, 
  Button,
  TextField 
} from '@mui/material';
import { useExpense } from '../context/ExpenseContext';

// Add to SavingsCalculator.jsx
import { motion } from 'framer-motion';


const SavingsCalculator = () => {
  const { expenses } = useExpense();
  const [savingsGoal, setSavingsGoal] = useState(500);
  const [timeframe, setTimeframe] = useState(3);

  const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0);
  const potentialSavings = (totalSpending * 0.15).toFixed(2); // 15% savings estimate

<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <Typography variant="h5" color="primary">
    Potential Savings: ${potentialSavings}
  </Typography>
</motion.div>
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Savings Potential
      </Typography>
      <Box>
        <Typography>You could save ${potentialSavings}/month</Typography>
        <TextField
          label="Savings Goal ($)"
          type="number"
          value={savingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Typography sx={{ mt: 2 }}>
          Target Timeframe: {timeframe} months
        </Typography>
        <Slider
          value={timeframe}
          onChange={(e, val) => setTimeframe(val)}
          min={1}
          max={12}
          step={1}
        />
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => alert(`To save $${savingsGoal} in ${timeframe} months, 
          reduce spending by $${(savingsGoal/timeframe).toFixed(2)}/month`)}
        >
          Calculate Plan
        </Button>
      </Box>
    </Paper>
  );
};

export default SavingsCalculator;