// Define the Asset interface for type safety
export interface Asset {
  name: string;
  symbol: string;
  value: number;
  change: number;
}

// Portfolio state interface for reducer
export interface PortfolioState {
  assets: Asset[];
}

// Action types for portfolio reducer
export type PortfolioAction =
  | { type: 'add'; asset: Asset }
  | { type: 'remove'; symbol: string }
  | { type: 'update'; symbol: string; asset: Partial<Asset> };
