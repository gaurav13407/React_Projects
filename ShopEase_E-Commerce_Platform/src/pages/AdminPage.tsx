import React from 'react';
import type { Product } from '../types/index';

interface AdminPageProps {
  products: Product[];
}

export const AdminPage: React.FC<AdminPageProps> = ({ products }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      <p style={styles.subtitle}>Total Products: {products.length}</p>
      <div style={styles.tableWrapper}>
        <table style={styles.tableCss}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>ID</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Category</th>
              <th style={styles.headerCell}>Price</th>
              <th style={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={styles.bodyRow}>
                <td style={styles.bodyCell}>{product.id}</td>
                <td style={styles.bodyCell}>{product.name}</td>
                <td style={styles.bodyCell}>{product.category}</td>
                <td style={styles.bodyCell}>${product.price.toFixed(2)}</td>
                <td style={styles.actionCell}>
                  <button style={styles.editButton}>Edit</button>
                  <button style={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#fff',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  } as React.CSSProperties,
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '24px',
  } as React.CSSProperties,
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  tableCss: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '2px solid #ddd',
    backgroundColor: '#fff',
  } as React.CSSProperties,
  headerRow: {
    backgroundColor: '#f5f5f5',
    borderBottom: '2px solid #ddd',
  } as React.CSSProperties,
  headerCell: {
    padding: '16px',
    textAlign: 'left' as const,
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    border: '1px solid #ddd',
  } as React.CSSProperties,
  bodyRow: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  bodyCell: {
    padding: '14px 16px',
    textAlign: 'left' as const,
    color: '#444',
    fontSize: '14px',
    border: '1px solid #eee',
  } as React.CSSProperties,
  actionCell: {
    padding: '12px 16px',
    textAlign: 'center' as const,
    border: '1px solid #eee',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  } as React.CSSProperties,
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  } as React.CSSProperties,
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  } as React.CSSProperties,
};
