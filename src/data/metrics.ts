import { DashboardMetric } from '../types/dashboard';

// Dashboard Metrics
export const mockDashboardMetrics: DashboardMetric[] = [
  {
    id: '1',
    title: 'Casos Ativos',
    value: 24,
    change: 2,
    trend: 'up',
    icon: 'case',
  },
  {
    id: '2',
    title: 'Clientes',
    value: 38,
    change: 5,
    trend: 'up',
    icon: 'users',
  },
  {
    id: '3',
    title: 'Audiências Pendentes',
    value: 12,
    change: -1,
    trend: 'down',
    icon: 'calendar',
  },
  {
    id: '4',
    title: 'Tarefas Pendentes',
    value: 45,
    change: 7,
    trend: 'up',
    icon: 'tasks',
  },
  {
    id: '5',
    title: 'Faturamento Mensal',
    value: 'R$ 78.500',
    change: 15,
    trend: 'up',
    icon: 'money',
  },
  {
    id: '6',
    title: 'Taxa de Sucesso',
    value: '76%',
    change: 4,
    trend: 'up',
    icon: 'chart',
  },
];
