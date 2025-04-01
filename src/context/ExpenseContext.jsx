import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    // Parse stored expenses and convert date strings to Date objects
    const saved = localStorage.getItem('expenses');
    if (saved) {
      return JSON.parse(saved).map(expense => ({
        ...expense,
        date: new Date(expense.date) // Convert string back to Date
      }));
    }
    return [];
  });

  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [{
      id: uuidv4(),
      ...expense,
      date: new Date(expense.date) // Ensure date is stored as Date object
    }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  // Now date will be a proper Date object
  const filteredExpenses = expenses.filter(expense => {
    return new Date(expense.date).getFullYear().toString() === filterYear;
  });

  // Add to ExpenseContext.jsx
const getRecommendations = () => {
    const overspendingCategories = Object.entries(userAverages)
      .filter(([cat, amount]) => amount > (marketAverages[cat] || Infinity))
      .map(([cat]) => cat);
  
    return overspendingCategories.length > 0
      ? `Consider reducing spending on: ${overspendingCategories.join(', ')}`
      : 'Your spending aligns well with market averages!';
  };

  // Add to ExpenseContext.jsx
const generateTips = () => {
    const tips = [];
    if (expenses.filter(e => e.category === 'eating_out').length > 5) {
      tips.push('Try meal prepping to reduce eating out costs');
    }
    if (totalExpenses > 3000) {
      tips.push('Consider negotiating recurring bills like internet/phone');
    }
    return tips.length > 0 ? tips : ['Your spending habits look healthy!'];
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: filteredExpenses,
        addExpense,
        deleteExpense,
        filterYear,
        setFilterYear
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);