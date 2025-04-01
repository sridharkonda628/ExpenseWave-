// src/components/ExpenseList.jsx
import { useState } from 'react'; // Add this import at the top
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Paper, 
  Divider, 
  Box, 
  Chip,
  TextField,
  MenuItem 
} from '@mui/material';
import { format } from 'date-fns';
import { useExpense } from '../context/ExpenseContext';
import { categories } from '../constants';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpense();
  const [sortBy, setSortBy] = useState('date'); // Now properly imported

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'amount') return b.amount - a.amount;
    return a.category.localeCompare(b.category);
  });

  const getCategoryLabel = (value) => 
    categories.find(c => c.value === value)?.label || value;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Your Expenses</Typography>
        <TextField
          select
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label="Sort by"
        >
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="amount">Amount</MenuItem>
          <MenuItem value="category">Category</MenuItem>
        </TextField>
      </Box>

      {expenses.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          No expenses found. Maybe add one?
        </Typography>
      ) : (
        <List>
          {sortedExpenses.map((expense) => (
            <Box key={expense.id}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={expense.title}
                  secondary={
                    <>
                      {format(expense.date, 'MMM dd, yyyy')} - 
                      ${expense.amount.toFixed(2)}
                      <Chip 
                        label={getCategoryLabel(expense.category)} 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ExpenseList;