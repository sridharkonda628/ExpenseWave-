import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
import { categories } from '../constants';

const ExpenseForm = () => {
  const { addExpense } = useExpense();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.amount || !formData.date || !formData.category) {
      alert('Please fill all fields');
      return;
    }

    addExpense({
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      category: formData.category
    });

    // Reset form
    setFormData({
      title: '',
      amount: '',
      date: '',
      category: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Add New Expense</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={handleChange}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
        />
        <TextField
          select
          name="category"
          label="Category"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add Expense
        </Button>
      </Box>
    </Paper>
  );
};

export default ExpenseForm;