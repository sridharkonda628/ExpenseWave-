import { TextField, Box, Typography } from '@mui/material';
import { useExpense } from '../context/ExpenseContext';

const ExpenseFilter = () => {
  const { filterYear, setFilterYear } = useExpense();

  const handleYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Filter by year
      </Typography>
      <TextField
        select
        value={filterYear}
        onChange={handleYearChange}
        variant="outlined"
        SelectProps={{
          native: true,
        }}
      >
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </TextField>
    </Box>
  );
};

export default ExpenseFilter;