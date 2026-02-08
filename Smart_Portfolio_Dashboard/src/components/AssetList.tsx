import React from 'react';
import type { Asset } from '../types';

interface AssetListProps {
  assets: Asset[];
  onRemove: (symbol: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onRemove }) => {
  if (assets.length === 0) {
    return <div className="empty-state"><p>No assets added yet. Add your first asset to get started!</p></div>;
  }

  return (
    <div className="asset-list">
      <h2>Portfolio Assets</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset.symbol} className="asset-card">
            <div className="asset-info">
              <div className="asset-header">
                <span className="asset-name">{asset.name}</span>
                <span className="asset-symbol">({asset.symbol})</span>
              </div>
              <div className="asset-details">
                <span className="asset-value">${asset.value.toFixed(2)}</span>
                <span
                  className={`asset-change ${asset.change >= 0 ? 'positive' : 'negative'}`}
                >
                  {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                </span>
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={() => onRemove(asset.symbol)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
