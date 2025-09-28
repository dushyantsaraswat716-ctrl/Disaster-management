import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const SimulationEnvironment = ({ 
  scenario, 
  isActive, 
  onActionComplete, 
  currentStep,
  language = 'en'
}) => {
  const [userPosition, setUserPosition] = useState({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false); 
  const [completedActions, setCompletedActions] = useState([]);

  const scenarios = {
    earthquake: {
      title: language === 'hi' ? 'भूकंप अभ्यास' : 'Earthquake Drill',
       environment: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg',
      hazards: [
        { id: 1, x: 30, y: 40, type: 'falling_object', danger: true },
        { id: 2, x: 70, y: 60, type: 'glass_window', danger: true },
        { id: 3, x: 20, y: 80, type: 'doorway', danger: false, safe: true }
      ],
      safeZones: [
        { id: 1, x: 15, y: 75, label: language === 'hi' ? 'सुरक्षित स्थान' : 'Safe Zone' },
        { id: 2, x: 85, y: 20, label: language === 'hi' ? 'मेज के नीचे' : 'Under Desk' }
      ]
    },
    fire: {
      title: language === 'hi' ? 'आग अभ्यास' : 'Fire Drill',
      environment: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
      hazards: [
        { id: 1, x: 40, y: 30, type: 'fire', danger: true },
        { id: 2, x: 60, y: 70, type: 'smoke', danger: true },
        { id: 3, x: 10, y: 90, type: 'exit', danger: false, safe: true }
      ],
      safeZones: [
        { id: 1, x: 5, y: 85, label: language === 'hi' ? 'आपातकालीन निकास' : 'Emergency Exit' },
        { id: 2, x: 95, y: 10, label: language === 'hi' ? 'सभा स्थल' : 'Assembly Point' }
      ]
    },
    flood: {
      title: language === 'hi' ? 'बाढ़ अभ्यास' : 'Flood Drill',
      environment: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
      hazards: [
        { id: 1, x: 50, y: 80, type: 'water', danger: true },
        { id: 2, x: 30, y: 60, type: 'electrical', danger: true },
        { id: 3, x: 80, y: 20, type: 'stairs', danger: false, safe: true }
      ],
      safeZones: [
        { id: 1, x: 85, y: 15, label: language === 'hi' ? 'ऊंची जगह' : 'Higher Ground' },
        { id: 2, x: 20, y: 10, label: language === 'hi' ? 'छत' : 'Rooftop' }
      ]
    }
  };

  const currentScenario = scenarios?.[scenario] || scenarios?.earthquake;

  const handleUserMove = (newX, newY) => {
    if (!isActive) return;
    
    setIsMoving(true);
    setUserPosition({ x: newX, y: newY });
    
    // Check for hazard interactions
    currentScenario?.hazards?.forEach(hazard => {
      const distance = Math.sqrt(
        Math.pow(newX - hazard?.x, 2) + Math.pow(newY - hazard?.y, 2)
      );
      
      if (distance < 10) {
        if (hazard?.danger) {
          onActionComplete('hazard_encountered', { hazard: hazard?.type, safe: false });
        } else if (hazard?.safe) {
          onActionComplete('safe_action', { action: hazard?.type, safe: true });
        }
      }
    });

    // Check for safe zone entry
    currentScenario?.safeZones?.forEach(zone => {
      const distance = Math.sqrt(
        Math.pow(newX - zone?.x, 2) + Math.pow(newY - zone?.y, 2)
      );
      
      if (distance < 15) {
        onActionComplete('safe_zone_reached', { zone: zone?.label, safe: true });
      }
    });

    setTimeout(() => setIsMoving(false), 300);
  };

  const handleEnvironmentClick = (event) => {
    if (!isActive) return;
    
    const rect = event?.currentTarget?.getBoundingClientRect();
    const x = ((event?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((event?.clientY - rect?.top) / rect?.height) * 100;
    
    handleUserMove(x, y);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
      {/* Environment Background */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleEnvironmentClick}
      >
        <Image
          src={currentScenario?.environment}
          alt={currentScenario?.title}
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Overlay for better visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      {/* Scenario Title */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
        <h3 className="font-semibold text-sm text-gray-800">
          {currentScenario?.title}
        </h3>
      </div>
      {/* Hazards */}
      {currentScenario?.hazards?.map(hazard => (
        <div
          key={hazard?.id}
          className={`absolute w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
            hazard?.danger ? 'bg-red-500' : 'bg-green-500'
          } ${hazard?.danger ? 'animate-pulse' : ''}`}
          style={{ left: `${hazard?.x}%`, top: `${hazard?.y}%` }}
        >
          <Icon 
            name={hazard?.danger ? "AlertTriangle" : "Shield"} 
            size={16} 
            color="white" 
          />
        </div>
      ))}
      {/* Safe Zones */}
      {currentScenario?.safeZones?.map(zone => (
        <div
          key={zone?.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${zone?.x}%`, top: `${zone?.y}%` }}
        >
          <div className="w-12 h-12 bg-green-500/30 border-2 border-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Shield" size={20} className="text-green-600" />
          </div>
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {zone?.label}
          </div>
        </div>
      ))}
      {/* User Avatar */}
      <div
        className={`absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isMoving ? 'scale-110' : 'scale-100'
        } border-2 border-white shadow-lg z-10`}
        style={{ left: `${userPosition?.x}%`, top: `${userPosition?.y}%` }}
      >
        <Icon name="User" size={16} color="white" />
      </div>
      {/* Instructions Overlay */}
      {isActive && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="MousePointer" size={16} className="text-blue-500" />
            <p className="text-sm text-gray-700">
              {language === 'hi' ?'सुरक्षित स्थान पर जाने के लिए क्लिक करें। खतरनाक क्षेत्रों से बचें।' :'Click to move to safe areas. Avoid dangerous zones.'
              }
            </p>
          </div>
        </div>
      )}
      {/* Emergency Actions */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onActionComplete('emergency_call', { action: 'call_112' })}
          iconName="Phone"
          iconSize={14}
        >
          112
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={() => onActionComplete('alert_others', { action: 'sound_alarm' })}
          iconName="Bell"
          iconSize={14}
        >
          {language === 'hi' ? 'अलार्म' : 'Alarm'}
        </Button>
      </div>
    </div>
  );
};

export default SimulationEnvironment;