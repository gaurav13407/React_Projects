import React from 'react';
import type { Asset } from '../types';

interface PortfolioSummaryProps {
  assets: Asset[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ assets }) => {
  // Calculate total portfolio value
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  // Calculate average percentage change
  const averageChange =
    assets.length > 0
      ? assets.reduce((sum, asset) => sum + asset.change, 0) / assets.length
      : 0;

  return (
    <div className="portfolio-summary">
      <h2>Portfolio Summary</h2>
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Portfolio Value</h3>
          <p className="summary-value">${totalValue.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Average Change</h3>
          <p className={`summary-value ${averageChange >= 0 ? 'positive' : 'negative'}`}>
            {averageChange >= 0 ? '+' : ''}{averageChange.toFixed(2)}%
          </p>
        </div>
        <div className="summary-card">
          <h3>Total Assets</h3>
          <p className="summary-value">{assets.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
