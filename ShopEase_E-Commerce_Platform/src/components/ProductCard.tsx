import React from 'react';
import type { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.category}>Category: {product.category}</p>
      <div style={styles.footer}>
        <span style={styles.price}>${product.price.toFixed(2)}</span>
        <button 
          onClick={() => onAddToCart(product)}
          style={styles.button}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  } as React.CSSProperties,
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '12px',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '8px 0',
    color: '#333',
  } as React.CSSProperties,
  description: {
    fontSize: '14px',
    color: '#666',
    margin: '8px 0',
  } as React.CSSProperties,
  category: {
    fontSize: '12px',
    color: '#999',
    margin: '8px 0',
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
  } as React.CSSProperties,
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2ecc71',
  } as React.CSSProperties,
  button: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  } as React.CSSProperties,
};
