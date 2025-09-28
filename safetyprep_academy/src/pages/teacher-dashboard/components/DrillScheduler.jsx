import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DrillScheduler = ({ onScheduleDrill, upcomingDrills = [] }) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [drillForm, setDrillForm] = useState({
    type: '',
    date: '',
    time: '',
    duration: '15',
    classes: [],
    instructions: ''
  });

  const drillTypes = [
    { value: 'earthquake', label: 'Earthquake Drill', icon: 'Zap' },
    { value: 'fire', label: 'Fire Evacuation', icon: 'Flame' },
    { value: 'flood', label: 'Flood Response', icon: 'CloudRain' },
    { value: 'cyclone', label: 'Cyclone Preparedness', icon: 'Wind' },
    { value: 'general', label: 'General Emergency', icon: 'AlertTriangle' }
  ];

  const classOptions = [
    { value: '6A', label: 'Class 6A' },
    { value: '6B', label: 'Class 6B' },
    { value: '7A', label: 'Class 7A' },
    { value: '7B', label: 'Class 7B' },
    { value: '8A', label: 'Class 8A' },
    { value: '8B', label: 'Class 8B' },
    { value: '9A', label: 'Class 9A' },
    { value: '9B', label: 'Class 9B' },
    { value: '10A', label: 'Class 10A' },
    { value: '10B', label: 'Class 10B' }
  ];

  const durationOptions = [
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '30', label: '30 minutes' }
  ];

  const handleInputChange = (field, value) => {
    setDrillForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSchedule = () => {
    if (drillForm?.type && drillForm?.date && drillForm?.time && drillForm?.classes?.length > 0) {
      onScheduleDrill(drillForm);
      setDrillForm({
        type: '',
        date: '',
        time: '',
        duration: '15',
        classes: [],
        instructions: ''
      });
      setIsScheduling(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  const getDrillIcon = (type) => {
    const drill = drillTypes?.find(d => d?.value === type);
    return drill ? drill?.icon : 'AlertTriangle';
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj?.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Drill Scheduler</h3>
          <Button
            variant="primary"
            onClick={() => setIsScheduling(!isScheduling)}
            iconName={isScheduling ? "X" : "Plus"}
            iconPosition="left"
          >
            {isScheduling ? 'Cancel' : 'Schedule Drill'}
          </Button>
        </div>
      </div>
      {isScheduling && (
        <div className="p-6 border-b border-border bg-muted/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Drill Type"
              placeholder="Select drill type"
              options={drillTypes}
              value={drillForm?.type}
              onChange={(value) => handleInputChange('type', value)}
              required
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={drillForm?.duration}
              onChange={(value) => handleInputChange('duration', value)}
            />

            <Input
              label="Date"
              type="date"
              value={drillForm?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              min={getMinDate()}
              required
            />

            <Input
              label="Time"
              type="time"
              value={drillForm?.time}
              onChange={(e) => handleInputChange('time', e?.target?.value)}
              required
            />

            <div className="md:col-span-2">
              <Select
                label="Classes"
                placeholder="Select classes to participate"
                options={classOptions}
                value={drillForm?.classes}
                onChange={(value) => handleInputChange('classes', value)}
                multiple
                searchable
                required
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Special Instructions"
                type="text"
                placeholder="Any specific instructions for this drill..."
                value={drillForm?.instructions}
                onChange={(e) => handleInputChange('instructions', e?.target?.value)}
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsScheduling(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSchedule}
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Drill
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        <h4 className="font-medium text-foreground mb-4">Upcoming Drills</h4>
        {upcomingDrills?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No upcoming drills scheduled</p>
            <p className="text-sm text-muted-foreground mt-1">
              Schedule your first drill to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingDrills?.map((drill) => (
              <div key={drill?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={getDrillIcon(drill?.type)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{drill?.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(drill?.date, drill?.time)} • {drill?.duration} min
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Classes: {drill?.classes?.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    iconSize={16}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrillScheduler;