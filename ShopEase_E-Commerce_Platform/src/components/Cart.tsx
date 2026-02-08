import React from 'react';
import type { CartItem } from '../types/index';

interface CartProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onQuantityChange }) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Shopping Cart ({items.length})</h2>
      <div style={styles.items}>
        {items.map((item) => (
          <div key={item.product.id} style={styles.item}>
            <div style={styles.itemDetails}>
              <h4>{item.product.name}</h4>
              <p>${item.product.price.toFixed(2)}</p>
            </div>
            <div style={styles.itemControls}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  onQuantityChange(item.product.id, parseInt(e.target.value))
                }
                style={styles.quantityInput}
              />
              <button
                onClick={() => onRemove(item.product.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
            <div style={styles.itemTotal}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button style={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
  } as React.CSSProperties,
  emptyCart: {
    padding: '24px',
    textAlign: 'center',
    color: '#999',
  } as React.CSSProperties,
  items: {
    marginBottom: '16px',
  } as React.CSSProperties,
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    marginBottom: '8px',
    borderRadius: '4px',
  } as React.CSSProperties,
  itemDetails: {
    flex: 1,
  } as React.CSSProperties,
  itemControls: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  } as React.CSSProperties,
  quantityInput: {
    width: '60px',
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  } as React.CSSProperties,
  removeButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  } as React.CSSProperties,
  itemTotal: {
    fontWeight: 'bold',
    minWidth: '80px',
    textAlign: 'right',
    color: '#2ecc71',
  } as React.CSSProperties,
  summary: {
    backgroundColor: '#ecf0f1',
    padding: '16px',
    borderRadius: '4px',
    marginTop: '16px',
  } as React.CSSProperties,
  checkoutButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '12px',
    width: '100%',
  } as React.CSSProperties,
};
