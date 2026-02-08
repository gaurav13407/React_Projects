import React, { useReducer, useState } from 'react';
import type { BudgetState, BudgetAction, IncomeEntry, ExpenseEntry, Currency, ConversionRates } from '../types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

/**
 * BudgetTracker Component
 * Comprehensive tracker for income and expenses with type-safe state management
 * Uses useReducer for complex state logic with strict type safety
 */

// Conversion rates (simplified for demo)
const CONVERSION_RATES: ConversionRates = {
  'USD_to_USD': 1,
  'USD_to_EUR': 0.92,
  'USD_to_GBP': 0.79,
  'EUR_to_USD': 1.09,
  'EUR_to_EUR': 1,
  'EUR_to_GBP': 0.86,
  'GBP_to_USD': 1.27,
  'GBP_to_EUR': 1.16,
  'GBP_to_GBP': 1,
};

/**
 * Pure reducer function with strict type checking
 */
const budgetReducer = (state: BudgetState, action: BudgetAction): BudgetState => {
  switch (action.type) {
    case 'addIncome': {
      // Type-safe: amount validation
      const income = action.payload;
      if (income.amount <= 0) {
        console.error('Income amount must be positive');
        return state;
      }
      return {
        ...state,
        income: [...state.income, income],
      };
    }

    case 'addExpense': {
      // Type-safe: amount validation
      const expense = action.payload;
      if (expense.amount <= 0) {
        console.error('Expense amount must be positive');
        return state;
      }
      const netBalance = calculateBalance(state.income, state.expenses, state.selectedCurrency) - expense.amount;
      if (netBalance < 0) {
        console.warn('Insufficient balance for this expense');
        return state; // Prevent negative balance
      }
      return {
        ...state,
        expenses: [...state.expenses, expense],
      };
    }

    case 'removeEntry': {
      const entryId = action.payload;
      return {
        ...state,
        income: state.income.filter((entry) => entry.id !== entryId),
        expenses: state.expenses.filter((entry) => entry.id !== entryId),
      };
    }

    case 'resetBudget': {
      return {
        ...state,
        income: [],
        expenses: [],
      };
    }

    default:
      return state;
  }
};

/**
 * Convert amount from one currency to another
 */
const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
  if (from === to) return amount;
  
  const rateKey = `${from}_to_${to}` as const;
  const rate = CONVERSION_RATES[rateKey];
  
  if (!rate) {
    console.error(`Conversion rate not found for ${from} to ${to}`);
    return amount;
  }
  
  return parseFloat((amount * rate).toFixed(2));
};

/**
 * Calculate balance in selected currency
 */
const calculateBalance = (
  income: ReadonlyArray<IncomeEntry>,
  expenses: ReadonlyArray<ExpenseEntry>,
  selectedCurrency: Currency
): number => {
  let totalIncome = 0;
  let totalExpenses = 0;

  // Sum income with conversion
  for (const entry of income) {
    totalIncome += convertCurrency(entry.amount, entry.currency, selectedCurrency);
  }

  // Sum expenses with conversion
  for (const entry of expenses) {
    totalExpenses += convertCurrency(entry.amount, entry.currency, selectedCurrency);
  }

  return parseFloat((totalIncome - totalExpenses).toFixed(2));
};

export const BudgetTracker: React.FC = () => {
  const initialState: BudgetState = {
    income: [],
    expenses: [],
    selectedCurrency: 'USD',
  };

  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  // Type-safe handler for adding transactions
  const handleAddTransaction = (amount: number, currency: Currency, transactionType: 'income' | 'expense'): void => {
    const id = `${Date.now()}-${Math.random()}`;
    const timestamp = new Date();

    if (transactionType === 'income') {
      const incomeEntry: IncomeEntry = {
        id,
        amount,
        currency,
        timestamp,
        description: 'Income',
      };
      dispatch({ type: 'addIncome', payload: incomeEntry });
    } else {
      const expenseEntry: ExpenseEntry = {
        id,
        amount,
        currency,
        timestamp,
        description: 'Expense',
      };
      dispatch({ type: 'addExpense', payload: expenseEntry });
    }
  };

  const handleRemoveEntry = (id: string): void => {
    dispatch({ type: 'removeEntry', payload: id });
  };

  const handleResetBudget = (): void => {
    if (window.confirm('Are you sure you want to reset the budget?')) {
      dispatch({ type: 'resetBudget' });
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCurrency(e.target.value as Currency);
  };

  // Combine income and expense entries with transaction type
  const allTransactions = [
    ...state.income.map((entry) => ({
      ...entry,
      type: 'income' as const,
      date: entry.timestamp,
    })),
    ...state.expenses.map((entry) => ({
      ...entry,
      type: 'expense' as const,
      date: entry.timestamp,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const balance = calculateBalance(state.income, state.expenses, selectedCurrency);
  const isBalanceNegative = balance < 0;

  return (
    <div className="budget-tracker">
      <div className="tracker-header">
        <h2>Secure Budget Tracker</h2>
        <p>Track your income and expenses across multiple currencies with type-safe operations</p>
      </div>

      <div className="tracker-container">
        <div className="balance-section">
          <div className={`balance-card ${isBalanceNegative ? 'negative' : 'positive'}`}>
            <h3>Net Balance</h3>
            <div className="currency-selector">
              <label htmlFor="currency-select">Display Currency</label>
              <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}>
                <option value="USD">🇺🇸 USD (US Dollar)</option>
                <option value="EUR">🇪🇺 EUR (Euro)</option>
                <option value="GBP">🇬🇧 GBP (British Pound)</option>
              </select>
            </div>
            <div className="balance-amount">
              {isBalanceNegative ? '-' : '+'} {Math.abs(balance).toFixed(2)} {selectedCurrency}
            </div>
            <div className="balance-breakdown">
              <div className="income-info">
                <span>Total Income:</span>
                <span>
                  {state.income
                    .reduce((sum, entry) => sum + convertCurrency(entry.amount, entry.currency, selectedCurrency), 0)
                    .toFixed(2)}{' '}
                  {selectedCurrency}
                </span>
              </div>
              <div className="expense-info">
                <span>Total Expenses:</span>
                <span>
                  {state.expenses
                    .reduce((sum, entry) => sum + convertCurrency(entry.amount, entry.currency, selectedCurrency), 0)
                    .toFixed(2)}{' '}
                  {selectedCurrency}
                </span>
              </div>
            </div>
          </div>

          <TransactionForm onSubmit={handleAddTransaction} />

          <div className="tracker-actions">
            <button onClick={handleResetBudget} className="btn-reset">
              Reset Budget
            </button>
          </div>
        </div>

        <div className="transactions-section">
          <TransactionList transactions={allTransactions} onSelect={handleRemoveEntry} />
          <div className="transaction-count">
            Total Transactions: {allTransactions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
