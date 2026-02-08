import React, { useMemo } from 'react';

interface DataItem {
  id: number;
  value: number;
  label: string;
}

interface AnalyticsChartProps {
  data: DataItem[];
}

// Simulate heavy computation for analytics
function computeAnalytics(data: DataItem[]) {
  console.log('Computing analytics...');
  // Simulate expensive operation
  let total = 0;
  let average = 0;
  
  if (data.length > 0) {
    total = data.reduce((acc, item) => acc + item.value, 0);
    average = total / data.length;
  }

  return {
    total,
    average,
    max: data.length > 0 ? Math.max(...data.map(d => d.value)) : 0,
    min: data.length > 0 ? Math.min(...data.map(d => d.value)) : 0,
  };
}

/**
 * AnalyticsChart Component
 * Demonstrates useMemo to cache expensive computations
 * Only recomputes when data changes
 */
const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const analytics = useMemo(() => {
    return computeAnalytics(data);
  }, [data]);

  return (
    <div className="analytics-chart">
      <h3>Analytics Metrics</h3>
      <div className="metrics-grid">
        <div className="metric">
          <span className="metric-label">Total Views</span>
          <span className="metric-value">{analytics.total}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Average</span>
          <span className="metric-value">{analytics.average.toFixed(2)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Max</span>
          <span className="metric-value">{analytics.max}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Min</span>
          <span className="metric-value">{analytics.min}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
