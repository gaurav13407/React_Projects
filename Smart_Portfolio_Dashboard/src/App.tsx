import { useReducer } from 'react';
import type { Asset, PortfolioState } from './types';
import { portfolioReducer } from './reducers/portfolioReducer';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import PortfolioSummary from './components/PortfolioSummary';
import './App.css';

const initialState: PortfolioState = {
  assets: [
    { name: 'Apple Inc.', symbol: 'AAPL', value: 150.25, change: 5.3 },
    { name: 'Microsoft Corporation', symbol: 'MSFT', value: 380.50, change: 2.8 },
    { name: 'Tesla Inc.', symbol: 'TSLA', value: 245.75, change: -3.2 }
  ]
};

function App() {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const handleAddAsset = (asset: Asset): void => {
    dispatch({ type: 'add', asset });
  };

  const handleRemoveAsset = (symbol: string): void => {
    dispatch({ type: 'remove', symbol });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Portfolio Dashboard</h1>
        <p>Manage your financial assets with strict type safety</p>
      </header>

      <main className="app-main">
        <PortfolioSummary assets={state.assets} />

        <div className="dashboard-content">
          <AssetForm onAdd={handleAddAsset} />
          <AssetList assets={state.assets} onRemove={handleRemoveAsset} />
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Smart Portfolio Dashboard - Built with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
