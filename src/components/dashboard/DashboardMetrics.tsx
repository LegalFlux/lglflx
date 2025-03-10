
import React from 'react';
import MetricsCard from './MetricsCard';
import { DashboardMetric } from '@/types';

interface DashboardMetricsProps {
  metrics: DashboardMetric[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric) => (
        <MetricsCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default DashboardMetrics;
