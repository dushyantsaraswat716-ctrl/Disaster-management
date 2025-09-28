import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onViewDetails, onShareAlert }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        bgColor: 'bg-error/10',
        borderColor: 'border-error',
        textColor: 'text-error',
        icon: 'AlertTriangle',
        label: 'Critical'
      },
      high: {
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning',
        textColor: 'text-warning',
        icon: 'AlertCircle',
        label: 'High'
      },
      moderate: {
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent',
        textColor: 'text-accent',
        icon: 'Info',
        label: 'Moderate'
      },
      low: {
        bgColor: 'bg-success/10',
        borderColor: 'border-success',
        textColor: 'text-success',
        icon: 'CheckCircle',
        label: 'Low'
      }
    };
    return configs?.[severity] || configs?.moderate;
  };

  const getDisasterIcon = (type) => {
    const icons = {
      earthquake: 'Zap',
      flood: 'CloudRain',
      fire: 'Flame',
      cyclone: 'Wind',
      tsunami: 'Waves',
      landslide: 'Mountain',
      heatwave: 'Sun',
      coldwave: 'Snowflake'
    };
    return icons?.[type] || 'AlertTriangle';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const severityConfig = getSeverityConfig(alert?.severity);

  return (
    <div className={`card ${severityConfig?.bgColor} ${severityConfig?.borderColor} border-l-4 p-4 mb-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${severityConfig?.bgColor}`}>
            <Icon 
              name={getDisasterIcon(alert?.type)} 
              size={20} 
              className={severityConfig?.textColor}
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              {alert?.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${severityConfig?.bgColor} ${severityConfig?.textColor}`}>
                <Icon name={severityConfig?.icon} size={12} className="mr-1" />
                {severityConfig?.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatTimeAgo(alert?.timestamp)}
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShareAlert(alert)}
          iconName="Share2"
          iconSize={16}
        />
      </div>
      <div className="space-y-3">
        <p className="text-foreground text-sm leading-relaxed">
          {alert?.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Affected Areas:</span>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              {alert?.affectedRegions?.join(', ')}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Duration:</span>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              {alert?.expectedDuration}
            </p>
          </div>
        </div>

        {alert?.safetyInstructions && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Safety Instructions:</span>
            </div>
            <ul className="text-sm text-foreground space-y-1 ml-6">
              {alert?.safetyInstructions?.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Building" size={12} />
            <span>Source: {alert?.source}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(alert)}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;