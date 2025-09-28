import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionTile = ({ 
  title, 
  description, 
  icon, 
  color, 
  actionText, 
  onClick, 
  badge = null,
  isNew = false 
}) => {
  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
          <Icon name={icon} size={28} color="white" />
        </div>
        {(isNew || badge) && (
          <div className="flex flex-col space-y-1">
            {isNew && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                New
              </span>
            )}
            {badge && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                {badge}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <Button
        variant="outline"
        fullWidth
        onClick={onClick}
        iconName="ArrowRight"
        iconPosition="right"
        iconSize={16}
        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
      >
        {actionText}
      </Button>
    </div>
  );
};

export default QuickActionTile;