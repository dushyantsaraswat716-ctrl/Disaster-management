import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProgressOverviewCard = ({ 
  disasterType, 
  progress, 
  total, 
  icon, 
  color, 
  achievements = [],
  onClick 
}) => {
  const percentage = Math.round((progress / total) * 100);
  
  const getStatusText = () => {
    if (percentage === 100) return 'Completed';
    if (percentage >= 75) return 'Almost Done';
    if (percentage >= 50) return 'In Progress';
    if (percentage >= 25) return 'Getting Started';
    return 'Not Started';
  };

  const getStatusColor = () => {
    if (percentage === 100) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 50) return 'text-accent';
    if (percentage >= 25) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className="card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
            <Icon name={icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{disasterType}</h3>
            <p className={`text-sm ${getStatusColor()}`}>{getStatusText()}</p>
          </div>
        </div>
        <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
      <div className="mb-4">
        <ProgressIndicator
          progress={progress}
          total={total}
          showPercentage={true}
          variant={percentage >= 75 ? 'success' : percentage >= 50 ? 'primary' : 'warning'}
        />
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{progress} of {total} modules</span>
        {achievements?.length > 0 && (
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={16} className="text-accent" />
            <span>{achievements?.length} badges</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressOverviewCard;