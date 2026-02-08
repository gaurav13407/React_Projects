import React, { type ChangeEvent, type FormEvent } from 'react';
import type { Asset } from '../types';

interface AssetEditorProps {
  asset: Asset;
  onUpdate: (symbol: string, updatedAsset: Asset) => void;
}

interface AssetEditorState {
  name: string;
  symbol: string;
  value: string;
  change: string;
  isEditing: boolean;
}

class AssetEditor extends React.Component<AssetEditorProps, AssetEditorState> {
  constructor(props: AssetEditorProps) {
    super(props);
    this.state = {
      name: props.asset.name,
      symbol: props.asset.symbol,
      value: props.asset.value.toString(),
      change: props.asset.change.toString(),
      isEditing: false
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    // Handle dynamic property updates with proper typing
    if (name === 'name' || name === 'symbol' || name === 'value' || name === 'change') {
      this.setState({ [name]: value } as unknown as Pick<AssetEditorState, typeof name extends keyof AssetEditorState ? typeof name : never>);
    }
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!this.state.name || !this.state.symbol || !this.state.value || this.state.change === '') {
      alert('Please fill in all fields');
      return;
    }

    const updatedAsset: Asset = {
      name: this.state.name,
      symbol: this.state.symbol.toUpperCase(),
      value: parseFloat(this.state.value),
      change: parseFloat(this.state.change)
    };

    this.props.onUpdate(this.props.asset.symbol, updatedAsset);
    this.setState({ isEditing: false });
  };

  toggleEditMode = (): void => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
    // Reset form if canceling
    if (this.state.isEditing) {
      this.setState({
        name: this.props.asset.name,
        symbol: this.props.asset.symbol,
        value: this.props.asset.value.toString(),
        change: this.props.asset.change.toString()
      });
    }
  };

  render() {
    if (!this.state.isEditing) {
      return (
        <div className="asset-editor-view">
          <h3>{this.state.name} ({this.state.symbol})</h3>
          <p>Value: ${this.state.value}</p>
          <p>Change: {this.state.change}%</p>
          <button onClick={this.toggleEditMode}>Edit</button>
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} className="asset-editor-form">
        <h3>Edit Asset</h3>
        <div className="form-group">
          <label>Asset Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Symbol:</label>
          <input
            type="text"
            name="symbol"
            value={this.state.symbol}
            onChange={this.handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Current Value ($):</label>
          <input
            type="number"
            name="value"
            value={this.state.value}
            onChange={this.handleChange}
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
            step="0.01"
          />
        </div>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={this.toggleEditMode}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default AssetEditor;
