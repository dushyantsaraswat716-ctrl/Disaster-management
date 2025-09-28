import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertMap = ({ alerts, userLocation, onLocationUpdate }) => {
  const [mapView, setMapView] = useState('satellite');
  const [showEvacuationRoutes, setShowEvacuationRoutes] = useState(false);

  // Mock coordinates for demonstration
  const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // New Delhi
  const currentLocation = userLocation || defaultLocation;

  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/view";
    const apiKey = "demo"; // Mock API key for demonstration
    const zoom = 10;
    
    return `https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=${zoom}&output=embed`;
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          };
          onLocationUpdate(newLocation);
        },
        (error) => {
          console.error('Location access denied:', error);
        }
      );
    }
  };

  const nearbyAlerts = alerts?.filter(alert => {
    // Mock proximity calculation
    return alert?.affectedRegions?.some(region => 
      region?.toLowerCase()?.includes('delhi') || 
      region?.toLowerCase()?.includes('ncr')
    );
  });

  return (
    <div className="card p-0 overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center">
            <Icon name="Map" size={20} className="mr-2 text-primary" />
            Disaster Alert Map
          </h3>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              Terrain
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLocationRequest}
              iconName="MapPin"
              iconPosition="left"
              iconSize={14}
            >
              Update Location
            </Button>
            
            <Button
              variant={showEvacuationRoutes ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowEvacuationRoutes(!showEvacuationRoutes)}
              iconName="Route"
              iconPosition="left"
              iconSize={14}
            >
              Evacuation Routes
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {nearbyAlerts?.length} alerts in your area
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative">
        <div className="w-full h-80 bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Disaster Alert Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapUrl()}
            className="border-0"
          />
        </div>

        {/* Map Overlays */}
        <div className="absolute top-4 left-4 space-y-2">
          {/* Legend */}
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
            <h4 className="font-medium text-sm mb-2">Alert Levels</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-xs">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-xs">Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>
          </div>

          {/* Current Location Indicator */}
          <div className="bg-primary/95 backdrop-blur-sm text-primary-foreground rounded-lg p-2 shadow-lg">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} />
              <span className="text-xs font-medium">Your Location</span>
            </div>
          </div>
        </div>

        {/* Evacuation Routes Overlay */}
        {showEvacuationRoutes && (
          <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg max-w-xs">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Icon name="Route" size={14} className="mr-2 text-primary" />
              Evacuation Routes
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Primary Route - Clear</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Secondary Route - Congested</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Emergency Route - Blocked</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Nearby Alerts Summary */}
      <div className="p-4 border-t border-border bg-muted/30">
        <h4 className="font-medium text-sm mb-3">Alerts in Your Area</h4>
        {nearbyAlerts?.length > 0 ? (
          <div className="space-y-2">
            {nearbyAlerts?.slice(0, 3)?.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-card rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={alert?.type === 'earthquake' ? 'Zap' : 'CloudRain'} 
                    size={14} 
                    className="text-error" 
                  />
                  <span className="text-sm font-medium">{alert?.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {alert?.distance || '5 km away'}
                </span>
              </div>
            ))}
            {nearbyAlerts?.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{nearbyAlerts?.length - 3} more alerts
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No active alerts in your immediate area</p>
        )}
      </div>
    </div>
  );
};

export default AlertMap;