import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import QuickEmergencyAccess from '../../components/ui/QuickEmergencyAccess';
import AlertCard from './components/AlertCard';
import AlertMap from './components/AlertMap';
import AlertFilters from './components/AlertFilters';
import AlertHistory from './components/AlertHistory';
import EmergencyActions from './components/EmergencyActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DisasterAlerts = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userRole, setUserRole] = useState('student');
  const [activeTab, setActiveTab] = useState('current');
  const [userLocation, setUserLocation] = useState(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [filters, setFilters] = useState({
    severity: 'all',
    disasterType: 'all',
    region: 'all',
    timeRange: 'all'
  });

  // Mock current alerts data
  const currentAlerts = [
    {
      id: 'alert-001',
      title: 'Severe Earthquake Warning - Delhi NCR',
      type: 'earthquake',
      severity: 'critical',
      description: `A magnitude 6.2 earthquake has been detected 45km northeast of New Delhi. Strong tremors are expected across the National Capital Region within the next 10-15 minutes. Immediate safety measures are required.`,
      affectedRegions: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
      expectedDuration: '15-20 minutes of strong shaking',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      source: 'National Disaster Management Authority (NDMA)',
      safetyInstructions: [
        'Drop to hands and knees immediately',
        'Take cover under a sturdy desk or table',
        'Hold on to your shelter and protect your head',
        'Stay away from windows, mirrors, and heavy objects',
        'If outdoors, move away from buildings and power lines',
        'Do not use elevators during or after the earthquake'
      ]
    },
    {
      id: 'alert-002',
      title: 'Flash Flood Warning - Mumbai Metropolitan Region',
      type: 'flood',
      severity: 'high',
      description: `Heavy rainfall of 150mm+ recorded in the last 3 hours. Flash flooding expected in low-lying areas of Mumbai, Thane, and Navi Mumbai. Water logging reported on major roads and railway tracks.`,
      affectedRegions: ['Mumbai', 'Thane', 'Navi Mumbai', 'Kalyan', 'Vasai'],
      expectedDuration: '6-8 hours until water recedes',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      source: 'India Meteorological Department (IMD)',
      safetyInstructions: [
        'Avoid traveling unless absolutely necessary',
        'Stay on higher floors if in flood-prone areas',
        'Do not walk or drive through flooded roads',
        'Keep emergency supplies and mobile phones charged',
        'Monitor local news and official updates regularly'
      ]
    },
    {
      id: 'alert-003',
      title: 'Cyclone Biparjoy Update - Gujarat Coast',
      type: 'cyclone',
      severity: 'moderate',
      description: `Cyclone Biparjoy is approaching the Gujarat coast with wind speeds of 120-130 kmph. Expected landfall near Jakhau Port in the next 12 hours. Coastal areas advised to complete evacuation procedures.`,
      affectedRegions: ['Kutch', 'Jamnagar', 'Porbandar', 'Dwarka', 'Bhuj'],
      expectedDuration: '18-24 hours of severe weather',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      source: 'India Meteorological Department (IMD)',
      safetyInstructions: [
        'Complete evacuation from coastal areas immediately',
        'Secure loose objects and board up windows',
        'Stock up on food, water, and medical supplies',
        'Charge all electronic devices and have backup power',
        'Stay indoors and away from windows during the storm'
      ]
    }
  ];

  // Mock historical alerts data
  const historicalAlerts = [
    {
      id: 'hist-001',
      title: 'Heat Wave Alert - Rajasthan',
      type: 'heatwave',
      severity: 'high',
      affectedRegions: ['Jaipur', 'Jodhpur', 'Bikaner'],
      timestamp: new Date(Date.now() - 86400000 * 7), // 7 days ago
      source: 'IMD'
    },
    {
      id: 'hist-002',
      title: 'Landslide Warning - Himachal Pradesh',
      type: 'landslide',
      severity: 'moderate',
      affectedRegions: ['Shimla', 'Manali', 'Dharamshala'],
      timestamp: new Date(Date.now() - 86400000 * 14), // 14 days ago
      source: 'NDMA'
    },
    {
      id: 'hist-003',
      title: 'Fire Emergency - Uttarakhand Forests',
      type: 'fire',
      severity: 'critical',
      affectedRegions: ['Nainital', 'Dehradun', 'Haridwar'],
      timestamp: new Date(Date.now() - 86400000 * 21), // 21 days ago
      source: 'Forest Department'
    }
  ];

  // Check for emergency alerts on component mount
  useEffect(() => {
    const criticalAlerts = currentAlerts?.filter(alert => alert?.severity === 'critical');
    setIsEmergencyActive(criticalAlerts?.length > 0);
  }, []);

  // Load user preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const savedRole = localStorage.getItem('userRole') || 'student';
    setCurrentLanguage(savedLanguage);
    setUserRole(savedRole);
  }, []);

  const getFilteredAlerts = () => {
    return currentAlerts?.filter(alert => {
      if (filters?.severity !== 'all' && alert?.severity !== filters?.severity) return false;
      if (filters?.disasterType !== 'all' && alert?.type !== filters?.disasterType) return false;
      if (filters?.timeRange !== 'all') {
        const alertTime = new Date(alert.timestamp);
        const now = new Date();
        const diffHours = (now - alertTime) / (1000 * 60 * 60);
        
        switch (filters?.timeRange) {
          case '1h': return diffHours <= 1;
          case '6h': return diffHours <= 6;
          case '24h': return diffHours <= 24;
          case '7d': return diffHours <= 168;
          case '30d': return diffHours <= 720;
          default: return true;
        }
      }
      return true;
    });
  };

  const getAlertCounts = () => {
    return {
      critical: currentAlerts?.filter(a => a?.severity === 'critical')?.length,
      high: currentAlerts?.filter(a => a?.severity === 'high')?.length,
      moderate: currentAlerts?.filter(a => a?.severity === 'moderate')?.length,
      low: currentAlerts?.filter(a => a?.severity === 'low')?.length,
      earthquake: currentAlerts?.filter(a => a?.type === 'earthquake')?.length,
      flood: currentAlerts?.filter(a => a?.type === 'flood')?.length,
      recent: currentAlerts?.filter(a => {
        const diffHours = (new Date() - new Date(a.timestamp)) / (1000 * 60 * 60);
        return diffHours <= 24;
      })?.length
    };
  };

  const handleViewAlertDetails = (alert) => {
    // Navigate to detailed alert view or open modal
    console.log('Viewing alert details:', alert);
  };

  const handleShareAlert = (alert) => {
    const shareText = `🚨 DISASTER ALERT 🚨\n${alert?.title}\nSeverity: ${alert?.severity?.toUpperCase()}\nAffected Areas: ${alert?.affectedRegions?.join(', ')}\nTime: ${new Date(alert.timestamp)?.toLocaleString()}\n\nStay safe and follow official guidelines.`;
    
    if (navigator.share) {
      navigator.share({
        title: alert?.title,
        text: shareText,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(shareText);
      // Show toast notification
    }
  };

  const handleLocationUpdate = (location) => {
    setUserLocation(location);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      severity: 'all',
      disasterType: 'all',
      region: 'all',
      timeRange: 'all'
    });
  };

  const handleAnalyzePattern = (alerts) => {
    console.log('Analyzing alert patterns:', alerts);
    // Navigate to analytics page or show analysis modal
  };

  const handleEmergencyAction = (actionType, data) => {
    console.log('Emergency action taken:', actionType, data);
    // Log action for analytics and compliance
  };

  const filteredAlerts = getFilteredAlerts();
  const alertCounts = getAlertCounts();
  const currentCriticalAlert = currentAlerts?.find(alert => alert?.severity === 'critical');

  const tabs = [
    { id: 'current', label: 'Current Alerts', icon: 'AlertTriangle', count: filteredAlerts?.length },
    { id: 'map', label: 'Alert Map', icon: 'Map', count: null },
    { id: 'history', label: 'History', icon: 'History', count: historicalAlerts?.length },
    { id: 'actions', label: 'Emergency Actions', icon: 'Zap', count: null }
  ];

  return (
    <div className="min-h-screen bg-background ">
      <Header userRole={userRole} isEmergencyActive={isEmergencyActive} />
      {/* Emergency Alert Banner */}
      {isEmergencyActive && currentCriticalAlert && (
        <EmergencyAlertBanner
          isActive={true}
          alertType={currentCriticalAlert?.type}
          message={currentCriticalAlert?.title}
          autoHide={false}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{paddingTop:80}}>
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Icon name="AlertTriangle" size={32} className="mr-3 text-error" />
                Disaster Alerts
              </h1>
              <p className="text-muted-foreground mt-2">
                Real-time emergency notifications and official disaster information
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/virtual-drill-simulation')}
                iconName="Play"
                iconPosition="left"
                iconSize={16}
              >
                Practice Drills
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/emergency-contacts')}
                iconName="Phone"
                iconPosition="left"
                iconSize={16}
              >
                Emergency Contacts
              </Button>
            </div>
          </div>

          {/* Alert Status Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-error">{alertCounts?.critical}</div>
                  <div className="text-sm text-muted-foreground">Critical Alerts</div>
                </div>
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-warning">{alertCounts?.high}</div>
                  <div className="text-sm text-muted-foreground">High Priority</div>
                </div>
                <Icon name="AlertCircle" size={24} className="text-warning" />
              </div>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-accent">{alertCounts?.moderate}</div>
                  <div className="text-sm text-muted-foreground">Moderate</div>
                </div>
                <Icon name="Info" size={24} className="text-accent" />
              </div>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-success">{alertCounts?.low}</div>
                  <div className="text-sm text-muted-foreground">Low Priority</div>
                </div>
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                {tab?.count !== null && (
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'current' && (
            <>
              <AlertFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                alertCounts={alertCounts}
                onClearFilters={handleClearFilters}
              />
              
              <div className="space-y-4">
                {filteredAlerts?.length > 0 ? (
                  filteredAlerts?.map((alert) => (
                    <AlertCard
                      key={alert?.id}
                      alert={alert}
                      onViewDetails={handleViewAlertDetails}
                      onShareAlert={handleShareAlert}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="CheckCircle" size={64} className="mx-auto text-success mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Active Alerts</h3>
                    <p className="text-muted-foreground">
                      No disaster alerts match your current filters. Stay prepared and check back regularly.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'map' && (
            <AlertMap
              alerts={currentAlerts}
              userLocation={userLocation}
              onLocationUpdate={handleLocationUpdate}
            />
          )}

          {activeTab === 'history' && (
            <AlertHistory
              historicalAlerts={historicalAlerts}
              onViewAlert={handleViewAlertDetails}
              onAnalyzePattern={handleAnalyzePattern}
            />
          )}

          {activeTab === 'actions' && (
            <EmergencyActions
              currentAlert={currentCriticalAlert}
              userLocation={userLocation}
              onActionTaken={handleEmergencyAction}
            />
          )}
        </div>
      </div>
      {/* Quick Emergency Access */}
      <QuickEmergencyAccess
        userRole={userRole}
        isEmergencyActive={isEmergencyActive}
      />
    </div>
  );
};

export default DisasterAlerts;