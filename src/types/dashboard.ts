
/**
 * Interface representing a metric displayed on the dashboard
 * @interface DashboardMetric
 */
export interface DashboardMetric {
  /** Unique identifier for the metric */
  id: string;
  /** Display name of the metric */
  title: string;
  /** Current value of the metric (number or formatted string) */
  value: number | string;
  /** Percentage change compared to previous period */
  change?: number;
  /** Direction of the change (improving, worsening, or no change) */
  trend?: 'up' | 'down' | 'neutral';
  /** Icon identifier to display with the metric */
  icon?: string;
  /** Time period the metric represents */
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Target or goal value for this metric */
  target?: number;
  /** Display color for the metric card */
  color?: string;
}
