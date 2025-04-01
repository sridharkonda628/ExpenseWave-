// src/App.jsx
import { Container } from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSummary from './components/ExpenseSummary';
import MarketComparison from './components/MarketComparison';
import SavingsCalculator from './components/SavingsCalculator';
import { ExpenseProvider } from './context/ExpenseContext';
// import { SavingsCalculator }from './components/SavingsCalculator';



function App() {
  return (
    <ExpenseProvider>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ExpenseForm />
        <MarketComparison />
       
        {/* <Box display="flex" gap={3} sx={{ my: 3 }}> */}
          <SavingsCalculator />
          <ExpenseSummary />
        {/* </Box> */}
        <ExpenseFilter />
        <ExpenseList />
      </Container>
    </ExpenseProvider>
  );
}

export default App;