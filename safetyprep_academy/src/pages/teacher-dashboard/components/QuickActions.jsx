import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction, isEmergencyActive = false }) => {
  const [activeAction, setActiveAction] = useState(null);

  const quickActions = [
    {
      id: 'emergency-drill',
      title: 'Start Emergency Drill',
      description: 'Initiate immediate drill for all classes',
      icon: 'AlertTriangle',
      color: 'error',
      urgent: true
    },
    {
      id: 'send-alert',
      title: 'Send Alert',
      description: 'Broadcast message to students',
      icon: 'MessageSquare',
      color: 'warning',
      urgent: false
    },
    {
      id: 'attendance-check',
      title: 'Attendance Check',
      description: 'Quick roll call for safety',
      icon: 'Users',
      color: 'primary',
      urgent: false
    },
    {
      id: 'evacuation-status',
      title: 'Evacuation Status',
      description: 'Monitor evacuation progress',
      icon: 'MapPin',
      color: 'success',
      urgent: false
    }
  ];

  const communicationActions = [
    {
      id: 'broadcast-message',
      title: 'Broadcast Message',
      description: 'Send message to all students',
      icon: 'Megaphone',
      color: 'primary'
    },
    {
      id: 'parent-notification',
      title: 'Notify Parents',
      description: 'Send updates to parents',
      icon: 'Phone',
      color: 'secondary'
    },
    {
      id: 'admin-report',
      title: 'Admin Report',
      description: 'Generate status report',
      icon: 'FileText',
      color: 'accent'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      success: 'bg-success text-success-foreground hover:bg-success/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      error: 'bg-error text-error-foreground hover:bg-error/90',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90'
    };
    return colors?.[color] || colors?.primary;
  };

  const handleAction = (actionId) => {
    setActiveAction(actionId);
    onAction(actionId);
    setTimeout(() => setActiveAction(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Actions */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-error" />
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          {isEmergencyActive && (
            <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full animate-pulse">
              EMERGENCY ACTIVE
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleAction(action?.id)}
              disabled={activeAction === action?.id}
              className={`p-4 rounded-lg text-left transition-all duration-200 hover:scale-[0.98] ${
                action?.urgent && isEmergencyActive 
                  ? 'ring-2 ring-error animate-pulse' :''
              } ${
                activeAction === action?.id
                  ? 'opacity-50 cursor-not-allowed' :'hover:shadow-md'
              } ${getColorClasses(action?.color)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name={action?.icon} size={20} />
                    <h4 className="font-medium">{action?.title}</h4>
                  </div>
                  <p className="text-sm opacity-90">{action?.description}</p>
                </div>
                {activeAction === action?.id && (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Communication Actions */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Communication</h3>
        </div>

        <div className="space-y-3">
          {communicationActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              fullWidth
              onClick={() => handleAction(action?.id)}
              loading={activeAction === action?.id}
              iconName={action?.icon}
              iconPosition="left"
              className="justify-start h-auto p-4"
            >
              <div className="text-left">
                <div className="font-medium">{action?.title}</div>
                <div className="text-sm text-muted-foreground">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Phone" size={20} className="text-error" />
          <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="destructive"
            onClick={() => window.location.href = 'tel:112'}
            iconName="Phone"
            iconPosition="left"
            size="sm"
          >
            Emergency (112)
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:101'}
            iconName="Flame"
            iconPosition="left"
            size="sm"
          >
            Fire (101)
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:100'}
            iconName="Shield"
            iconPosition="left"
            size="sm"
          >
            Police (100)
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = 'tel:108'}
            iconName="Heart"
            iconPosition="left"
            size="sm"
          >
            Medical (108)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;