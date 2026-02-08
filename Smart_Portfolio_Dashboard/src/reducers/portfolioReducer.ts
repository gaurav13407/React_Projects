import type { PortfolioState, PortfolioAction } from '../types';

export const portfolioReducer = (state: PortfolioState, action: PortfolioAction): PortfolioState => {
  switch (action.type) {
    case 'add':
      // Check if asset with same symbol already exists
      if (state.assets.some(a => a.symbol === action.asset.symbol)) {
        alert(`Asset with symbol ${action.asset.symbol} already exists!`);
        return state;
      }
      return {
        ...state,
        assets: [...state.assets, action.asset]
      };

    case 'remove':
      return {
        ...state,
        assets: state.assets.filter(a => a.symbol !== action.symbol)
      };

    case 'update':
      return {
        ...state,
        assets: state.assets.map(a =>
          a.symbol === action.symbol
            ? { ...a, ...action.asset }
            : a
        )
      };

    default:
      return state;
  }
};
