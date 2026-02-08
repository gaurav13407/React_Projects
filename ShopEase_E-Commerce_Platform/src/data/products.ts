import type { Product } from '../types/index';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 99.99,
    description: 'High-quality audio with noise cancellation',
    image: 'https://via.placeholder.com/200?text=Headphones',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Advanced health tracking and notifications',
    image: 'https://via.placeholder.com/200?text=SmartWatch',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'USB-C Cable',
    price: 14.99,
    description: 'Durable charging cable, 6ft length',
    image: 'https://via.placeholder.com/200?text=Cable',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Portable Power Bank',
    price: 49.99,
    description: '20000mAh capacity with fast charging',
    image: 'https://via.placeholder.com/200?text=PowerBank',
    category: 'Accessories'
  },
  {
    id: 5,
    name: 'Webcam HD',
    price: 79.99,
    description: '1080p resolution with auto-focus',
    image: 'https://via.placeholder.com/200?text=Webcam',
    category: 'Electronics'
  }
];
