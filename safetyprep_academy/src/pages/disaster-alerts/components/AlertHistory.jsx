import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertHistory = ({ historicalAlerts, onViewAlert, onAnalyzePattern }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date()?.getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date()?.getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getAlertsByMonth = () => {
    return historicalAlerts?.filter(alert => {
      const alertDate = new Date(alert.timestamp);
      return alertDate?.getMonth() === selectedMonth && alertDate?.getFullYear() === selectedYear;
    });
  };

  const getAlertStats = () => {
    const monthlyAlerts = getAlertsByMonth();
    const stats = {
      total: monthlyAlerts?.length,
      critical: monthlyAlerts?.filter(a => a?.severity === 'critical')?.length,
      high: monthlyAlerts?.filter(a => a?.severity === 'high')?.length,
      moderate: monthlyAlerts?.filter(a => a?.severity === 'moderate')?.length,
      low: monthlyAlerts?.filter(a => a?.severity === 'low')?.length
    };

    const disasterTypes = {};
    monthlyAlerts?.forEach(alert => {
      disasterTypes[alert.type] = (disasterTypes?.[alert?.type] || 0) + 1;
    });

    return { ...stats, disasterTypes };
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-error',
      high: 'text-warning',
      moderate: 'text-accent',
      low: 'text-success'
    };
    return colors?.[severity] || 'text-muted-foreground';
  };

  const monthlyAlerts = getAlertsByMonth();
  const stats = getAlertStats();

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground text-lg flex items-center">
          <Icon name="History" size={20} className="mr-2 text-primary" />
          Alert History
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAnalyzePattern(monthlyAlerts)}
          iconName="TrendingUp"
          iconPosition="left"
          iconSize={14}
        >
          Analyze Patterns
        </Button>
      </div>
      {/* Month/Year Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedMonth(selectedMonth > 0 ? selectedMonth - 1 : 11)}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <span className="font-medium min-w-[120px] text-center">
            {months?.[selectedMonth]} {selectedYear}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedMonth(selectedMonth < 11 ? selectedMonth + 1 : 0)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedYear(selectedYear - 1)}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <span className="font-medium">{selectedYear}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedYear(selectedYear + 1)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>
      {/* Statistics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-foreground">{stats?.total}</div>
          <div className="text-sm text-muted-foreground">Total Alerts</div>
        </div>
        <div className="bg-error/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-error">{stats?.critical}</div>
          <div className="text-sm text-muted-foreground">Critical</div>
        </div>
        <div className="bg-warning/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-warning">{stats?.high}</div>
          <div className="text-sm text-muted-foreground">High</div>
        </div>
        <div className="bg-accent/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-accent">{stats?.moderate}</div>
          <div className="text-sm text-muted-foreground">Moderate</div>
        </div>
        <div className="bg-success/10 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-success">{stats?.low}</div>
          <div className="text-sm text-muted-foreground">Low</div>
        </div>
      </div>
      {/* Disaster Type Breakdown */}
      {Object.keys(stats?.disasterTypes)?.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-sm mb-3">Disaster Type Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(stats?.disasterTypes)?.map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <span className="text-sm capitalize">{type}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Alert List */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">
          Alerts for {months?.[selectedMonth]} {selectedYear}
        </h4>
        
        {monthlyAlerts?.length > 0 ? (
          <div className="max-h-96 overflow-y-auto space-y-2">
            {monthlyAlerts?.map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={alert?.type === 'earthquake' ? 'Zap' : 'CloudRain'} 
                    size={16} 
                    className={getSeverityColor(alert?.severity)}
                  />
                  <div>
                    <div className="font-medium text-sm">{alert?.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(alert?.timestamp)} • {alert?.affectedRegions?.[0]}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)} bg-current/10`}>
                    {alert?.severity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewAlert(alert)}
                    iconName="Eye"
                    iconSize={14}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              No alerts recorded for {months?.[selectedMonth]} {selectedYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertHistory;