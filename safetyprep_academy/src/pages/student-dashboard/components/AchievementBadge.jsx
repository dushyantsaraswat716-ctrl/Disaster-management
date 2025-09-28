import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, size = 'default', showDetails = true }) => {
  const getSizeClasses = () => {
    const sizes = {
      sm: 'w-8 h-8',
      default: 'w-12 h-12',
      lg: 'w-16 h-16'
    };
    return sizes?.[size] || sizes?.default;
  };

  const getIconSize = () => {
    const sizes = {
      sm: 16,
      default: 20,
      lg: 24
    };
    return sizes?.[size] || sizes?.default;
  };

  const getBadgeColor = (category) => {
    const colors = {
      learning: 'bg-primary',
      drill: 'bg-success',
      streak: 'bg-accent',
      special: 'bg-secondary',
      milestone: 'bg-error'
    };
    return colors?.[category] || colors?.learning;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`flex items-center space-x-3 ${!showDetails ? 'justify-center' : ''}`}>
      <div className={`${getSizeClasses()} rounded-full ${getBadgeColor(achievement?.category)} flex items-center justify-center shadow-lg`}>
        <Icon name={achievement?.icon} size={getIconSize()} color="white" />
      </div>
      {showDetails && (
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{achievement?.name}</h4>
          <p className="text-sm text-muted-foreground truncate">{achievement?.description}</p>
          {achievement?.earnedAt && (
            <p className="text-xs text-muted-foreground mt-1">
              Earned on {formatDate(achievement?.earnedAt)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;