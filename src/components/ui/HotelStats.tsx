
import React from 'react';
import { cn } from '@/lib/utils';

interface HotelStatsProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const HotelStats = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: HotelStatsProps) => {
  return (
    <div className={cn("hotel-stats-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
      {(description || trend) && (
        <div className="mt-2 flex items-center space-x-1">
          {trend && (
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};
