import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DashboardMetric } from '@/types';

interface MetricsCardProps {
  metric: DashboardMetric;
  className?: string;
  onClick?: () => void;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metric, className, onClick }) => {
  const getIcon = () => {
    switch (metric.icon) {
      case 'case':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
      case 'users':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 1 0 7.75"/></svg>;
      case 'calendar':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
      case 'tasks':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
      case 'money':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
      case 'chart':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
      case 'clock':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
      case 'document':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
      case 'gavel':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 14-8.5 8.5a2.12 2.12 0 1 1-3-3L11 11"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>;
      default:
        return null;
    }
  };

  const getTrendIcon = () => {
    if (!metric.trend) return null;
    
    if (metric.trend === 'up') return <TrendingUp className="h-4 w-4" />;
    if (metric.trend === 'down') return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getCardStyles = () => {
    let baseStyles = "shadow-sm overflow-hidden animate-fade-in transition-all duration-200";
    
    if (onClick) {
      baseStyles += " cursor-pointer hover:shadow-md hover:translate-y-[-2px]";
    }
    
    if (metric.color) {
      return cn(baseStyles, `border-l-4 border-l-${metric.color}`, className);
    }
    
    return cn(baseStyles, className);
  };

  const getTrendColor = () => {
    if (!metric.trend) return "text-gray-500";
    
    const isPositiveTrend = 
      (metric.trend === 'up' && metric.title.toLowerCase().includes('receita')) ||
      (metric.trend === 'up' && metric.title.toLowerCase().includes('ganho')) ||
      (metric.trend === 'up' && metric.title.toLowerCase().includes('sucesso')) ||
      (metric.trend === 'down' && metric.title.toLowerCase().includes('despesa')) ||
      (metric.trend === 'down' && metric.title.toLowerCase().includes('perda')) ||
      (metric.trend === 'down' && metric.title.toLowerCase().includes('pendente'));
      
    return isPositiveTrend ? "text-emerald-500" : "text-amber-500";
  };

  return (
    <Card className={getCardStyles()} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            <p className="text-2xl font-semibold mt-1">{metric.value}</p>
          </div>
          <div className="rounded-full p-2 bg-primary/10 text-primary">
            {getIcon()}
          </div>
        </div>
        
        {metric.change !== undefined && metric.trend && (
          <div className="mt-4 flex items-center">
            <span className={cn("flex items-center text-xs font-medium", getTrendColor())}>
              {getTrendIcon()}
              {Math.abs(metric.change)}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {metric.period === 'daily' && 'Desde ontem'}
              {metric.period === 'weekly' && 'Desde a semana passada'}
              {metric.period === 'monthly' && 'Desde o mês passado'}
              {metric.period === 'yearly' && 'Desde o ano passado'}
              {!metric.period && 'Desde o mês passado'}
            </span>
          </div>
        )}
        
        {metric.target && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Meta: {metric.target}</span>
              <span className={Number(metric.value) >= metric.target ? "text-emerald-500" : "text-amber-500"}>
                {Math.round((Number(metric.value) / metric.target) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted/40 rounded-full h-1.5 mt-1">
              <div 
                className="bg-primary h-1.5 rounded-full" 
                style={{ width: `${Math.min(Math.round((Number(metric.value) / metric.target) * 100), 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
