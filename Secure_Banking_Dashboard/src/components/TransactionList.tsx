import React from 'react';
import type { TransactionListProps } from '../types';

/**
 * TransactionList Component - Functional Component
 * Displays a list of transactions with strict type safety
 */
const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onSelect,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list empty">
        <p>No transactions available</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id} onClick={() => onSelect(tx.id)} className="transaction-item">
            <div className="transaction-info">
              <span className={`transaction-type ${tx.type}`}>
                {tx.type === 'income' ? '📥 Income' : '📤 Expense'}
              </span>
              <span className="transaction-amount">
                {tx.amount} {tx.currency}
              </span>
            </div>
            <div className="transaction-date">
              {tx.date.toLocaleDateString()} {tx.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
