import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  progress = 0, 
  total = 100, 
  label = '', 
  showPercentage = true,
  showBadges = false,
  badges = [],
  size = 'default',
  variant = 'default',
  className = ''
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  const getSizeClasses = () => {
    const sizes = {
      sm: 'h-2',
      default: 'h-3',
      lg: 'h-4'
    };
    return sizes?.[size] || sizes?.default;
  };

  const getVariantClasses = () => {
    const variants = {
      default: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      primary: 'bg-primary'
    };
    return variants?.[variant] || variants?.default;
  };

  const getStatusIcon = () => {
    if (percentage === 100) return 'CheckCircle';
    if (percentage >= 75) return 'TrendingUp';
    if (percentage >= 50) return 'Activity';
    if (percentage >= 25) return 'Clock';
    return 'AlertCircle';
  };

  const getStatusColor = () => {
    if (percentage === 100) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 50) return 'text-accent';
    if (percentage >= 25) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            <Icon 
              name={getStatusIcon()} 
              size={16} 
              className={`${getStatusColor()} transition-colors duration-300`}
            />
          </div>
          {showPercentage && (
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      {/* Progress Bar */}
      <div className="relative">
        <div className={`progress-bar ${getSizeClasses()}`}>
          <div 
            className={`progress-fill ${getVariantClasses()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Progress Text Overlay for larger bars */}
        {size === 'lg' && showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white mix-blend-difference">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      {/* Detailed Progress Info */}
      {(progress !== percentage || total !== 100) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{progress} of {total} completed</span>
          {percentage === 100 && (
            <span className="text-success font-medium flex items-center">
              <Icon name="CheckCircle" size={12} className="mr-1" />
              Complete
            </span>
          )}
        </div>
      )}
      {/* Achievement Badges */}
      {showBadges && badges?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {badges?.map((badge, index) => (
            <div
              key={index}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                badge?.earned 
                  ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
              }`}
            >
              <Icon 
                name={badge?.icon || 'Award'} 
                size={12} 
                className="mr-1" 
              />
              {badge?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Specialized Progress Components
export const DrillProgress = ({ 
  completedDrills = 0, 
  totalDrills = 10, 
  currentStreak = 0,
  className = '' 
}) => {
  const badges = [
    { name: 'First Drill', icon: 'Play', earned: completedDrills >= 1 },
    { name: 'Safety Star', icon: 'Star', earned: completedDrills >= 5 },
    { name: 'Preparedness Pro', icon: 'Shield', earned: completedDrills >= 10 },
    { name: 'Streak Master', icon: 'Zap', earned: currentStreak >= 7 }
  ];

  return (
    <ProgressIndicator
      progress={completedDrills}
      total={totalDrills}
      label="Drill Completion"
      showBadges={true}
      badges={badges}
      variant="primary"
      className={className}
    />
  );
};

export const LearningProgress = ({ 
  completedLessons = 0, 
  totalLessons = 20, 
  masteryLevel = 0,
  className = '' 
}) => {
  const badges = [
    { name: 'Quick Learner', icon: 'BookOpen', earned: completedLessons >= 5 },
    { name: 'Knowledge Seeker', icon: 'Brain', earned: completedLessons >= 10 },
    { name: 'Safety Expert', icon: 'GraduationCap', earned: masteryLevel >= 80 },
    { name: 'Course Complete', icon: 'Trophy', earned: completedLessons >= totalLessons }
  ];

  return (
    <ProgressIndicator
      progress={completedLessons}
      total={totalLessons}
      label="Learning Progress"
      showBadges={true}
      badges={badges}
      variant="success"
      className={className}
    />
  );
};

export const EmergencyReadiness = ({ 
  readinessScore = 0, 
  maxScore = 100,
  lastUpdated = null,
  className = '' 
}) => {
  const getReadinessLevel = () => {
    if (readinessScore >= 90) return 'Excellent';
    if (readinessScore >= 75) return 'Good';
    if (readinessScore >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  const getVariant = () => {
    if (readinessScore >= 75) return 'success';
    if (readinessScore >= 50) return 'warning';
    return 'error';
  };

  return (
    <div className={className}>
      <ProgressIndicator
        progress={readinessScore}
        total={maxScore}
        label="Emergency Readiness"
        variant={getVariant()}
        size="lg"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Level: {getReadinessLevel()}</span>
        {lastUpdated && (
          <span>Updated: {new Date(lastUpdated)?.toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;