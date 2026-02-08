// UNOPTIMIZED: Importing entire lodash library
import _ from 'lodash';
import moment from 'moment';

export const formatPriceUnoptimized = (price: number): string => {
  // Using lodash method - imports all of lodash unnecessarily
  const rounded = _.round(price, 2);
  return `$${rounded}`;
};

export const formatDateUnoptimized = (date: Date): string => {
  // Using moment - imports entire library just for formatting
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const debounceSearchUnoptimized = (fn: (...args: any[]) => any, delay: number) => {
  // Using lodash.debounce - imports entire lodash
  return _.debounce(fn, delay);
};

export const getUniqueProductsUnoptimized = (products: any[]) => {
  // Using lodash.uniq - imports entire lodash
  return _.uniq(products.map(p => p.id));
};
