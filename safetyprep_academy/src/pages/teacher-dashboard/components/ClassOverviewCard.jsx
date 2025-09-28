import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ClassOverviewCard = ({ 
  title, 
  value, 
  total, 
  percentage, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  description 
}) => {
  const getColorClasses = () => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${getColorClasses()}`}>
            <Icon name={icon} size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {total && (
            <span className="text-lg text-muted-foreground">/ {total}</span>
          )}
        </div>

        {percentage !== undefined && (
          <ProgressIndicator
            progress={percentage}
            total={100}
            variant={color}
            size="sm"
            showPercentage={false}
          />
        )}
      </div>
    </div>
  );
};

export default ClassOverviewCard;