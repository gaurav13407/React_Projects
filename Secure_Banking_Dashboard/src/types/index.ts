/**
 * Type definitions for the Secure Banking Dashboard
 */

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  date: Date;
  type: 'income' | 'expense';
}

export interface TransactionListProps {
  transactions: Transaction[];
  onSelect: (id: string) => void;
}

export interface TransactionFormProps {
  onSubmit: (amount: number, currency: Currency, transactionType: 'income' | 'expense') => void;
}

export interface IncomeEntry {
  id: string;
  amount: number;
  currency: Currency;
  timestamp: Date;
  description: string;
}

export interface ExpenseEntry {
  id: string;
  amount: number;
  currency: Currency;
  timestamp: Date;
  description: string;
}

export type BudgetAction =
  | { type: 'addIncome'; payload: IncomeEntry }
  | { type: 'addExpense'; payload: ExpenseEntry }
  | { type: 'removeEntry'; payload: string }
  | { type: 'resetBudget' };

export interface BudgetState {
  readonly income: ReadonlyArray<IncomeEntry>;
  readonly expenses: ReadonlyArray<ExpenseEntry>;
  readonly selectedCurrency: Currency;
}

export interface ConversionRates {
  readonly [key: string]: number;
}

export interface CurrencyConverterProps<T extends Currency = Currency> {
  readonly currencies: ReadonlyArray<T>;
  readonly rates: ConversionRates;
  readonly onConvert: (amount: number, from: T, to: T) => number;
}
