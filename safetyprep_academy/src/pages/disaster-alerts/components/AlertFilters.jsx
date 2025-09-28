import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlertFilters = ({ 
  filters, 
  onFiltersChange, 
  alertCounts,
  onClearFilters 
}) => {
  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'low', label: 'Low' }
  ];

  const disasterTypeOptions = [
    { value: 'all', label: 'All Disasters' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'flood', label: 'Flood' },
    { value: 'fire', label: 'Fire' },
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'tsunami', label: 'Tsunami' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'heatwave', label: 'Heat Wave' },
    { value: 'coldwave', label: 'Cold Wave' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North India' },
    { value: 'south', label: 'South India' },
    { value: 'east', label: 'East India' },
    { value: 'west', label: 'West India' },
    { value: 'central', label: 'Central India' },
    { value: 'northeast', label: 'Northeast India' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all');

  return (
    <div className="card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2 text-primary" />
          Filter Alerts
        </h3>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Severity Level"
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => handleFilterChange('severity', value)}
          className="w-full"
        />

        <Select
          label="Disaster Type"
          options={disasterTypeOptions}
          value={filters?.disasterType}
          onChange={(value) => handleFilterChange('disasterType', value)}
          className="w-full"
        />

        <Select
          label="Region"
          options={regionOptions}
          value={filters?.region}
          onChange={(value) => handleFilterChange('region', value)}
          className="w-full"
        />

        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange}
          onChange={(value) => handleFilterChange('timeRange', value)}
          className="w-full"
        />
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filters?.severity === 'critical' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('severity', filters?.severity === 'critical' ? 'all' : 'critical')}
          iconName="AlertTriangle"
          iconPosition="left"
          iconSize={14}
        >
          Critical ({alertCounts?.critical || 0})
        </Button>

        <Button
          variant={filters?.disasterType === 'earthquake' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('disasterType', filters?.disasterType === 'earthquake' ? 'all' : 'earthquake')}
          iconName="Zap"
          iconPosition="left"
          iconSize={14}
        >
          Earthquake ({alertCounts?.earthquake || 0})
        </Button>

        <Button
          variant={filters?.disasterType === 'flood' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('disasterType', filters?.disasterType === 'flood' ? 'all' : 'flood')}
          iconName="CloudRain"
          iconPosition="left"
          iconSize={14}
        >
          Flood ({alertCounts?.flood || 0})
        </Button>

        <Button
          variant={filters?.timeRange === '24h' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('timeRange', filters?.timeRange === '24h' ? 'all' : '24h')}
          iconName="Clock"
          iconPosition="left"
          iconSize={14}
        >
          Last 24h ({alertCounts?.recent || 0})
        </Button>
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={14} className="text-primary" />
            <span className="text-sm font-medium text-primary">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (value === 'all') return null;
              
              const getFilterLabel = (key, value) => {
                const option = {
                  severity: severityOptions,
                  disasterType: disasterTypeOptions,
                  region: regionOptions,
                  timeRange: timeRangeOptions
                }?.[key]?.find(opt => opt?.value === value);
                
                return option ? option?.label : value;
              };

              return (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  {getFilterLabel(key, value)}
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertFilters;