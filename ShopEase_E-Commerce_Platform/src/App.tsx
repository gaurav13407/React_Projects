import { useState, Suspense, lazy } from 'react';
import './App.css';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { mockProducts } from './data/products';
import type { CartItem, Product } from './types/index';

// Lazy load admin page - only loaded when needed (code splitting example)
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [optimizationType, setOptimizationType] = useState<'unoptimized' | 'optimized'>('unoptimized');

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const loadOptimizationExample = async () => {
    if (optimizationType === 'unoptimized') {
      // This loads the unoptimized utilities (full lodash, moment)
      const { formatPriceUnoptimized, formatDateUnoptimized } = await import('./utils/unoptimized');
      console.log('Loaded unoptimized utilities');
      console.log('Price:', formatPriceUnoptimized(99.99));
      console.log('Date:', formatDateUnoptimized(new Date()));
    } else {
      // This loads the optimized utilities (only needed functions)
      const { formatPriceOptimized, formatDateOptimized } = await import('./utils/optimized');
      console.log('Loaded optimized utilities');
      console.log('Price:', formatPriceOptimized(99.99));
      console.log('Date:', formatDateOptimized(new Date()));
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>🛍️ ShopEase E-Commerce Platform</h1>
        <p style={styles.subtitle}>Bundle Analysis & Optimization Demo</p>
      </header>

      <nav style={styles.nav}>
        <button
          onClick={() => setShowAdmin(false)}
          style={{
            ...styles.navButton,
            backgroundColor: !showAdmin ? '#3498db' : '#95a5a6',
          }}
        >
          Shop
        </button>
        <button
          onClick={() => setShowAdmin(true)}
          style={{
            ...styles.navButton,
            backgroundColor: showAdmin ? '#3498db' : '#95a5a6',
          }}
        >
          Admin Dashboard
        </button>
        <button
          onClick={() => setOptimizationType(optimizationType === 'unoptimized' ? 'optimized' : 'unoptimized')}
          style={{
            ...styles.navButton,
            backgroundColor: '#e74c3c',
          }}
        >
          Bundle: {optimizationType.toUpperCase()}
        </button>
      </nav>

      <div style={styles.mainContent}>
        <div style={styles.leftPanel}>
          {!showAdmin ? (
            <ProductList products={mockProducts} onAddToCart={handleAddToCart} />
          ) : (
            <Suspense fallback={<div>Loading admin page...</div>}>
              <AdminPage products={mockProducts} />
            </Suspense>
          )}
        </div>

        <div style={styles.rightPanel}>
          <Cart
            items={cartItems}
            onRemove={handleRemoveFromCart}
            onQuantityChange={handleQuantityChange}
          />
          <button
            onClick={loadOptimizationExample}
            style={styles.demoButton}
          >
            📊 Demo: Load {optimizationType.toUpperCase()} Code (Check Console)
          </button>
          <div style={styles.infoBox}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📚 Bundle Optimization Demo</h3>
            
            <div style={styles.demoExplanation}>
              <p style={{ fontSize: '12px', margin: '8px 0', fontWeight: 'bold', color: '#e74c3c' }}>
                ❌ UNOPTIMIZED MODE:
              </p>
              <p style={{ fontSize: '12px', margin: '0 0 12px 0', color: '#666' }}>
                • Imports entire Lodash library (71 KB)<br/>
                • Imports entire Moment library (67 KB)<br/>
                • Total waste: ~138 KB bloat
              </p>
              
              <p style={{ fontSize: '12px', margin: '8px 0', fontWeight: 'bold', color: '#27ae60' }}>
                ✅ OPTIMIZED MODE:
              </p>
              <p style={{ fontSize: '12px', margin: '0 0 12px 0', color: '#666' }}>
                • Imports only needed Lodash functions (2 KB)<br/>
                • Uses date-fns instead of moment (3 KB)<br/>
                • Native implementations (0 KB overhead)<br/>
                • Total savings: ~132 KB (96% reduction!)
              </p>
            </div>

            <div style={styles.currentMode}>
              <strong>Current Mode:</strong> <span style={{ color: optimizationType === 'unoptimized' ? '#e74c3c' : '#27ae60' }}>
                {optimizationType === 'unoptimized' ? '❌ UNOPTIMIZED' : '✅ OPTIMIZED'}
              </span>
            </div>
            <p style={{ fontSize: '11px', margin: '8px 0 0 0', color: '#7f8c8d' }}>
              Cart Items: {cartItems.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowX: 'hidden',
  } as React.CSSProperties,
  header: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    textAlign: 'center',
    flexShrink: 0,
  } as React.CSSProperties,
  subtitle: {
    margin: '8px 0 0 0',
    fontSize: '14px',
    opacity: 0.8,
  } as React.CSSProperties,
  nav: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#34495e',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexShrink: 0,
  } as React.CSSProperties,
  navButton: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  } as React.CSSProperties,
  mainContent: {
    display: 'grid',
    gridTemplateColumns: 'minmax(600px, 1fr) 350px',
    gap: '20px',
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    flex: 1,
  } as React.CSSProperties,
  leftPanel: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'auto',
  } as React.CSSProperties,
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  demoButton: {
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    padding: '12px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  } as React.CSSProperties,
  infoBox: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontSize: '14px',
  } as React.CSSProperties,
  demoExplanation: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '12px',
    border: '1px solid #e0e0e0',
  } as React.CSSProperties,
  currentMode: {
    padding: '12px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    fontSize: '12px',
  } as React.CSSProperties,
  hint: {
    backgroundColor: '#fff3cd',
    padding: '8px',
    borderRadius: '4px',
    borderLeft: '4px solid #ffc107',
    marginTop: '12px',
  } as React.CSSProperties,
};

export default App;
