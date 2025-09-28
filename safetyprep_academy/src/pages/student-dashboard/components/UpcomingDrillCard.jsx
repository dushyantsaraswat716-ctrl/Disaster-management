import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDrillCard = ({ drill, onJoin, onRemind }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeUntilDrill = (dateString) => {
    const now = new Date();
    const drillDate = new Date(dateString);
    const diffInHours = Math.ceil((drillDate - now) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Starting soon';
    if (diffInHours < 24) return `In ${diffInHours} hours`;
    const days = Math.ceil(diffInHours / 24);
    return `In ${days} day${days > 1 ? 's' : ''}`;
  };

  const getDrillTypeColor = (type) => {
    const colors = {
      earthquake: 'bg-error',
      fire: 'bg-warning',
      flood: 'bg-primary',
      cyclone: 'bg-secondary',
      general: 'bg-accent'
    };
    return colors?.[type] || colors?.general;
  };

  const getDrillIcon = (type) => {
    const icons = {
      earthquake: 'Zap',
      fire: 'Flame',
      flood: 'CloudRain',
      cyclone: 'Wind',
      general: 'Shield'
    };
    return icons?.[type] || icons?.general;
  };

  return (
    <div className="card p-4 border-l-4 border-l-primary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg ${getDrillTypeColor(drill?.type)} flex items-center justify-center`}>
            <Icon name={getDrillIcon(drill?.type)} size={20} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{drill?.title}</h4>
            <p className="text-sm text-muted-foreground">{drill?.type?.charAt(0)?.toUpperCase() + drill?.type?.slice(1)} Drill</p>
          </div>
        </div>
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          {getTimeUntilDrill(drill?.scheduledAt)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>{formatDate(drill?.scheduledAt)}</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>{formatTime(drill?.scheduledAt)}</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="MapPin" size={16} />
          <span>{drill?.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>{drill?.participants} students</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onJoin(drill?.id)}
          iconName="Play"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          Join Drill
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemind(drill?.id)}
          iconName="Bell"
          iconSize={14}
        >
        </Button>
      </div>
    </div>
  );
};

export default UpcomingDrillCard;