// src/components/ExpenseSummary.jsx
import { Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useExpense } from '../context/ExpenseContext';
import { categories } from '../constants';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];


const ExpenseSummary = () => {
    const { expenses } = useExpense();
    
    const categoryData = categories.map(category => ({
        name: category.label,
        value: expenses
        .filter(e => e.category === category.value)
        .reduce((sum, e) => sum + e.amount, 0)
    })).filter(item => item.value > 0);
    
    // Add this check at the start of your component
    if (!expenses || expenses.length === 0) {
        return (
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography>No expenses data available for chart</Typography>
          </Paper>
        );
      }
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Expense Summary
      </Typography>
      <Box display="flex" alignItems="center">
        <Box flex={1}>
          <Typography variant="body1">
            Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong>
          </Typography>
          {categoryData.map((category) => (
            <Typography key={category.name} variant="body2">
              {category.name}: ${category.value.toFixed(2)} (
              {(category.value / totalExpenses * 100).toFixed(1)}%)
            </Typography>
          ))}
        </Box>
        <Box width="40%" height={300}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExpenseSummary;