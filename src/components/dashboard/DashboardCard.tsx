
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  children,
  className,
  actions,
  footer,
  isLoading = false,
  variant = 'default',
}) => {
  // Define card variant styles
  const variantStyles = {
    default: '',
    primary: 'border-primary/20 bg-primary/5',
    secondary: 'border-secondary/40 bg-secondary/10',
    outline: 'border-2 border-border',
  };

  // Loading state UI
  if (isLoading) {
    return (
      <Card className={cn("shadow-sm overflow-hidden animate-pulse", className)}>
        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <div className="h-5 w-40 bg-muted rounded"></div>
            {description && <div className="h-4 w-60 bg-muted rounded"></div>}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-sm overflow-hidden animate-fade-in", variantStyles[variant], className)}>
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary shrink-0">{icon}</div>}
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
      {footer && (
        <div className="border-t p-3 bg-muted/10 flex items-center justify-between">
          {footer}
        </div>
      )}
    </Card>
  );
};

export default DashboardCard;
