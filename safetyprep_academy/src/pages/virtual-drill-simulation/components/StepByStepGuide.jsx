import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StepByStepGuide = ({ 
  scenario, 
  currentStep, 
  onStepComplete, 
  onStepChange,
  language = 'en',
  isAudioEnabled = true 
}) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const drillSteps = {
    earthquake: [
      {
        id: 1,
        title: language === 'hi' ? 'तुरंत रुकें' : 'Stop Immediately',
        description: language === 'hi' ?'जो भी काम कर रहे हैं, तुरंत रोक दें और शांत रहें।' :'Stop whatever you are doing immediately and stay calm.',
        icon: 'Hand',
        duration: 5,
        action: 'stop_activity',
        safety_tip: language === 'hi' ?'घबराएं नहीं, शांति बनाए रखें' :'Do not panic, maintain composure'
      },
      {
        id: 2,
        title: language === 'hi' ? 'झुकें और छुपें' : 'Drop and Take Cover',
        description: language === 'hi' ?'तुरंत जमीन पर झुकें और मजबूत मेज या डेस्क के नीचे छुप जाएं।' :'Immediately drop to the ground and take cover under a sturdy desk or table.',
        icon: 'ArrowDown',
        duration: 10,
        action: 'take_cover',
        safety_tip: language === 'hi' ?'सिर और गर्दन को सुरक्षित रखें' :'Protect your head and neck'
      },
      {
        id: 3,
        title: language === 'hi' ? 'पकड़ें' : 'Hold On',
        description: language === 'hi' ?'अपने आश्रय को मजबूती से पकड़ें और हिलने तक प्रतीक्षा करें।' :'Hold on to your shelter firmly and wait until shaking stops.',
        icon: 'Grip',
        duration: 15,
        action: 'hold_position',
        safety_tip: language === 'hi' ?'हिलना बंद होने तक प्रतीक्षा करें' :'Wait until shaking completely stops'
      },
      {
        id: 4,
        title: language === 'hi' ? 'सुरक्षित निकास' : 'Safe Evacuation',
        description: language === 'hi' ?'हिलना बंद होने के बाद, धीरे-धीरे और सावधानी से बाहर निकलें।' :'After shaking stops, evacuate slowly and carefully.',
        icon: 'DoorOpen',
        duration: 20,
        action: 'evacuate',
        safety_tip: language === 'hi' ?'लिफ्ट का उपयोग न करें' :'Do not use elevators'
      }
    ],
    fire: [
      {
        id: 1,
        title: language === 'hi' ? 'अलार्म बजाएं' : 'Sound the Alarm',
        description: language === 'hi' ?'तुरंत फायर अलार्म बजाएं या चिल्लाकर सबको सचेत करें।' :'Immediately sound the fire alarm or shout to alert others.',
        icon: 'Bell',
        duration: 5,
        action: 'sound_alarm',
        safety_tip: language === 'hi' ?'सबको तुरंत सचेत करें' :'Alert everyone immediately'
      },
      {
        id: 2,
        title: language === 'hi' ? 'नीचे रहें' : 'Stay Low',
        description: language === 'hi' ?'धुएं से बचने के लिए नीचे झुकें या रेंगकर चलें।' :'Stay low or crawl to avoid smoke inhalation.',
        icon: 'ArrowDown',
        duration: 10,
        action: 'stay_low',
        safety_tip: language === 'hi' ?'साफ हवा नीचे होती है' :'Clean air is closer to the ground'
      },
      {
        id: 3,
        title: language === 'hi' ? 'निकास खोजें' : 'Find Exit',
        description: language === 'hi' ?'निकटतम आपातकालीन निकास खोजें और उसकी ओर बढ़ें।' :'Locate the nearest emergency exit and move towards it.',
        icon: 'DoorOpen',
        duration: 15,
        action: 'find_exit',
        safety_tip: language === 'hi' ?'दरवाजे को छूकर गर्मी जांचें' :'Check doors for heat before opening'
      },
      {
        id: 4,
        title: language === 'hi' ? 'सभा स्थल' : 'Assembly Point',
        description: language === 'hi' ?'निर्धारित सभा स्थल पर जाएं और उपस्थिति दर्ज कराएं।' :'Go to designated assembly point and report attendance.',
        icon: 'Users',
        duration: 20,
        action: 'assembly_point',
        safety_tip: language === 'hi' ?'वापस अंदर न जाएं' :'Do not re-enter the building'
      }
    ],
    flood: [
      {
        id: 1,
        title: language === 'hi' ? 'ऊंची जगह जाएं' : 'Move to Higher Ground',
        description: language === 'hi' ?'तुरंत सबसे ऊंची मंजिल या छत पर जाएं।' :'Immediately move to the highest floor or rooftop.',
        icon: 'ArrowUp',
        duration: 10,
        action: 'move_up',
        safety_tip: language === 'hi' ?'लिफ्ट का उपयोग न करें' :'Do not use elevators'
      },
      {
        id: 2,
        title: language === 'hi' ? 'बिजली बंद करें' : 'Turn Off Electricity',
        description: language === 'hi' ?'मुख्य स्विच से बिजली बंद करें और इलेक्ट्रिकल उपकरणों से दूर रहें।' :'Turn off main electrical supply and stay away from electrical equipment.',
        icon: 'Zap',
        duration: 5,
        action: 'electricity_off',
        safety_tip: language === 'hi' ?'पानी और बिजली का संयोजन खतरनाक है' :'Water and electricity combination is dangerous'
      },
      {
        id: 3,
        title: language === 'hi' ? 'सहायता के लिए संकेत' : 'Signal for Help',
        description: language === 'hi' ?'चमकीले कपड़े या टॉर्च से सहायता के लिए संकेत दें।' :'Use bright cloth or flashlight to signal for help.',
        icon: 'Flashlight',
        duration: 15,
        action: 'signal_help',
        safety_tip: language === 'hi' ?'शोर मचाकर ध्यान आकर्षित करें' :'Make noise to attract attention'
      },
      {
        id: 4,
        title: language === 'hi' ? 'बचाव की प्रतीक्षा' : 'Wait for Rescue',
        description: language === 'hi' ?'सुरक्षित स्थान पर रहें और बचाव दल की प्रतीक्षा करें।' :'Stay in safe location and wait for rescue team.',
        icon: 'Shield',
        duration: 30,
        action: 'wait_rescue',
        safety_tip: language === 'hi' ?'धैर्य रखें और शांत रहें' :'Stay patient and remain calm'
      }
    ]
  };

  const currentSteps = drillSteps?.[scenario] || drillSteps?.earthquake;
  const activeStep = currentSteps?.find(step => step?.id === currentStep);

  useEffect(() => {
    if (activeStep && isAudioEnabled) {
      // Simulate audio instruction
      setIsPlaying(true);
      const timer = setTimeout(() => setIsPlaying(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, activeStep, isAudioEnabled]);

  const handleStepComplete = (stepId) => {
    if (!completedSteps?.includes(stepId)) {
      const newCompleted = [...completedSteps, stepId];
      setCompletedSteps(newCompleted);
      onStepComplete(stepId);
    }
  };

  const getStepStatus = (stepId) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {language === 'hi' ? 'चरणबद्ध निर्देश' : 'Step-by-Step Instructions'}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            iconName={isPlaying ? "VolumeX" : "Volume2"}
            iconSize={16}
          >
            {language === 'hi' ? 'ऑडियो' : 'Audio'}
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>
            {language === 'hi' ? 'प्रगति' : 'Progress'}: {completedSteps?.length}/{currentSteps?.length}
          </span>
          <span>{Math.round((completedSteps?.length / currentSteps?.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps?.length / currentSteps?.length) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Steps List */}
      <div className="space-y-4">
        {currentSteps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          return (
            <div
              key={step?.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                status === 'active' ?'border-blue-500 bg-blue-50' 
                  : status === 'completed' ?'border-green-500 bg-green-50' :'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Step Number/Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                status === 'completed' 
                  ? 'bg-green-500 text-white' 
                  : status === 'active' ?'bg-blue-500 text-white' :'bg-gray-300 text-gray-600'
              }`}>
                {status === 'completed' ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${
                    status === 'active' ? 'text-blue-700' : 'text-gray-800'
                  }`}>
                    {step?.title}
                  </h3>
                  {status === 'active' && (
                    <div className="flex items-center space-x-2">
                      {isPlaying && (
                        <Icon name="Volume2" size={16} className="text-blue-500 animate-pulse" />
                      )}
                      <span className="text-sm text-blue-600 font-medium">
                        {step?.duration}s
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {step?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Icon name="Lightbulb" size={12} />
                    <span>{step?.safety_tip}</span>
                  </div>
                  
                  {status === 'active' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStepComplete(step?.id)}
                      iconName="Check"
                      iconSize={14}
                    >
                      {language === 'hi' ? 'पूर्ण' : 'Complete'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStepChange(Math.max(1, currentStep - 1))}
          disabled={currentStep <= 1}
          iconName="ChevronLeft"
          iconSize={16}
        >
          {language === 'hi' ? 'पिछला' : 'Previous'}
        </Button>
        
        <div className="text-sm text-gray-500">
          {language === 'hi' ? 'चरण' : 'Step'} {currentStep} {language === 'hi' ? 'का' : 'of'} {currentSteps?.length}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStepChange(Math.min(currentSteps?.length, currentStep + 1))}
          disabled={currentStep >= currentSteps?.length}
          iconName="ChevronRight"
          iconSize={16}
        >
          {language === 'hi' ? 'अगला' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default StepByStepGuide;