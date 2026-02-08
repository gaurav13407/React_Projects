import React, { type ChangeEvent, type FormEvent } from 'react';
import type { Asset } from '../types';

interface AssetFormProps {
  onAdd: (asset: Asset) => void;
}

interface AssetFormState {
  name: string;
  symbol: string;
  value: string;
  change: string;
}

class AssetForm extends React.Component<AssetFormProps, AssetFormState> {
  state: AssetFormState = {
    name: '',
    symbol: '',
    value: '',
    change: ''
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    } as Pick<AssetFormState, keyof AssetFormState>);
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate form inputs
    if (!this.state.name || !this.state.symbol || !this.state.value || this.state.change === '') {
      alert('Please fill in all fields');
      return;
    }

    const asset: Asset = {
      name: this.state.name,
      symbol: this.state.symbol.toUpperCase(),
      value: parseFloat(this.state.value),
      change: parseFloat(this.state.change)
    };

    this.props.onAdd(asset);
    this.resetForm();
  };

  resetForm = (): void => {
    this.setState({
      name: '',
      symbol: '',
      value: '',
      change: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="asset-form">
        <h2>Add New Asset</h2>
        <div className="form-group">
          <label>Asset Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="e.g., Apple"
          />
        </div>
        <div className="form-group">
          <label>Symbol:</label>
          <input
            type="text"
            name="symbol"
            value={this.state.symbol}
            onChange={this.handleChange}
            placeholder="e.g., AAPL"
          />
        </div>
        <div className="form-group">
          <label>Current Value ($):</label>
          <input
            type="number"
            name="value"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="e.g., 150.50"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Change (%):</label>
          <input
            type="number"
            name="change"
            value={this.state.change}
            onChange={this.handleChange}
            placeholder="e.g., 5.5"
            step="0.01"
          />
        </div>
        <button type="submit">Add Asset</button>
      </form>
    );
  }
}

export default AssetForm;
