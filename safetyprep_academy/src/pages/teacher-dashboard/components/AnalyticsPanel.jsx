import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const AnalyticsPanel = ({ analyticsData = {} }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('participation');

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const metricOptions = [
    { value: 'participation', label: 'Participation Rate' },
    { value: 'completion', label: 'Completion Rate' },
    { value: 'performance', label: 'Performance Score' },
    { value: 'engagement', label: 'Engagement Level' }
  ];

  const mockAnalytics = {
    participation: {
      current: 87,
      previous: 82,
      trend: 'up',
      data: [
        { label: 'Class 6A', value: 92, total: 30 },
        { label: 'Class 6B', value: 85, total: 28 },
        { label: 'Class 7A', value: 89, total: 32 },
        { label: 'Class 7B', value: 83, total: 29 }
      ]
    },
    completion: {
      current: 78,
      previous: 75,
      trend: 'up',
      data: [
        { label: 'Earthquake Module', value: 85, total: 120 },
        { label: 'Fire Safety', value: 92, total: 120 },
        { label: 'Flood Response', value: 67, total: 120 },
        { label: 'First Aid', value: 73, total: 120 }
      ]
    },
    performance: {
      current: 82,
      previous: 79,
      trend: 'up',
      data: [
        { label: 'Excellent (90-100%)', value: 25, total: 120 },
        { label: 'Good (75-89%)', value: 45, total: 120 },
        { label: 'Fair (60-74%)', value: 35, total: 120 },
        { label: 'Needs Improvement (<60%)', value: 15, total: 120 }
      ]
    },
    engagement: {
      current: 91,
      previous: 88,
      trend: 'up',
      data: [
        { label: 'Active Participation', value: 95, total: 120 },
        { label: 'Question Asking', value: 68, total: 120 },
        { label: 'Peer Interaction', value: 84, total: 120 },
        { label: 'Resource Usage', value: 77, total: 120 }
      ]
    }
  };

  const currentData = mockAnalytics?.[selectedMetric] || mockAnalytics?.participation;
  const improvementAreas = [
    { area: 'Flood Response Training', score: 67, priority: 'high' },
    { area: 'First Aid Knowledge', score: 73, priority: 'medium' },
    { area: 'Evacuation Speed', score: 78, priority: 'medium' },
    { area: 'Communication Protocol', score: 81, priority: 'low' }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10',
      medium: 'text-warning bg-warning/10',
      low: 'text-success bg-success/10'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getTrendIcon = () => {
    return currentData?.trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = () => {
    return currentData?.trend === 'up' ? 'text-success' : 'text-error';
  };

  const handleExportReport = () => {
    // Mock export functionality
    const reportData = {
      timeRange,
      metric: selectedMetric,
      data: currentData,
      timestamp: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${timeRange}-${Date.now()}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Class Analytics</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            iconName="Download"
            iconPosition="left"
          >
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
          <Select
            label="Metric"
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
          />
        </div>

        {/* Key Metric Display */}
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">
              {metricOptions?.find(m => m?.value === selectedMetric)?.label}
            </h4>
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              <Icon name={getTrendIcon()} size={16} />
              <span className="text-sm font-medium">
                {currentData?.current > currentData?.previous ? '+' : ''}
                {currentData?.current - currentData?.previous}%
              </span>
            </div>
          </div>

          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-4xl font-bold text-foreground">{currentData?.current}%</span>
            <span className="text-muted-foreground">overall</span>
          </div>

          <ProgressIndicator
            progress={currentData?.current}
            total={100}
            variant={currentData?.current >= 80 ? 'success' : currentData?.current >= 60 ? 'warning' : 'error'}
            showPercentage={false}
          />
        </div>
      </div>
      {/* Detailed Breakdown */}
      <div className="card p-6">
        <h4 className="font-medium text-foreground mb-4">Detailed Breakdown</h4>
        <div className="space-y-4">
          {currentData?.data?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{item?.label}</h5>
                <p className="text-sm text-muted-foreground">
                  {item?.value} of {item?.total} students
                </p>
              </div>
              <div className="w-32">
                <ProgressIndicator
                  progress={item?.value}
                  total={item?.total}
                  size="sm"
                  variant={item?.value / item?.total >= 0.8 ? 'success' : item?.value / item?.total >= 0.6 ? 'warning' : 'error'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Areas */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Target" size={20} className="text-warning" />
          <h4 className="font-medium text-foreground">Areas for Improvement</h4>
        </div>
        <div className="space-y-3">
          {improvementAreas?.map((area, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(area?.priority)}`}>
                  {area?.priority}
                </span>
                <span className="font-medium text-foreground">{area?.area}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">{area?.score}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconSize={16}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;