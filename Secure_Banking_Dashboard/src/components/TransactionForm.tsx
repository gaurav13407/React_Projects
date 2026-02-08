import React from 'react';
import type { TransactionFormProps, Currency } from '../types';

interface TransactionFormState {
  amount: string;
  currency: Currency;
  description: string;
  transactionType: 'income' | 'expense';
}

/**
 * TransactionForm Component - Class Component
 * Form for submitting transactions with strict type safety
 */
class TransactionForm extends React.Component<TransactionFormProps, TransactionFormState> {
  static defaultProps = {
    onSubmit: () => {},
  };

  state: TransactionFormState = {
    amount: '',
    currency: 'USD',
    description: '',
    transactionType: 'income',
  };

  handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const amount = e.target.value;
    if (amount === '' || /^\d*\.?\d*$/.test(amount)) {
      this.setState({ amount });
    }
  };

  handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const currency = e.target.value as Currency;
    this.setState({ currency });
  };

  handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ description: e.target.value });
  };

  handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ transactionType: e.target.value as 'income' | 'expense' });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { amount, currency } = this.state;
    const numAmount = parseFloat(amount);

    // Type-safe validation
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    this.props.onSubmit(numAmount, currency, this.state.transactionType);

    // Reset form
    this.setState({
      amount: '',
      currency: 'USD',
      description: '',
      transactionType: 'income',
    });
  };

  componentDidUpdate(_prevProps: TransactionFormProps, prevState: TransactionFormState): void {
    if (prevState.amount !== this.state.amount) {
      // Component update logic can be added here
    }
  }

  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit} className="transaction-form">
        <h3>Add Transaction</h3>

        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type</label>
          <select
            id="transactionType"
            value={this.state.transactionType}
            onChange={this.handleTransactionTypeChange}
          >
            <option value="income">📥 Income</option>
            <option value="expense">📤 Expense</option>
          </select>
        </div>

        <div className="form-group">
          <input
            id="description"
            type="text"
            placeholder="Enter description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            value={this.state.amount}
            onChange={this.handleAmountChange}
            step="0.01"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={this.state.currency}
            onChange={this.handleCurrencyChange}
          >
            <option value="USD">USD (US Dollar)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="GBP">GBP (British Pound)</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Submit Transaction
        </button>
      </form>
    );
  }
}

export default TransactionForm;
