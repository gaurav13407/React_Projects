// OPTIMIZED: Importing only what we need (tree-shakable)
import { round } from 'lodash';
import { format } from 'date-fns';

export const formatPriceOptimized = (price: number): string => {
  // Using only lodash/round - smaller bundle footprint
  const rounded = round(price, 2);
  return `$${rounded}`;
};

export const formatDateOptimized = (date: Date): string => {
  // Using date-fns instead of moment (smaller, tree-shakable)
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const debounceSearchOptimized = (fn: (...args: any[]) => any, delay: number) => {
  // Native debounce implementation - no library needed
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const getUniqueProductsOptimized = (products: any[]) => {
  // Using Set instead of lodash.uniq - native, zero overhead
  return Array.from(new Set(products.map(p => p.id)));
};
