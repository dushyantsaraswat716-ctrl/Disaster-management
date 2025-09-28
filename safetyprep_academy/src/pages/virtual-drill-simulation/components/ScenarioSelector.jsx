import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ScenarioSelector = ({ 
  onScenarioSelect, 
  selectedScenario, 
  language = 'en',
  userProgress = {} 
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');

  const scenarios = [
    {
      id: 'earthquake',
      title: language === 'hi' ? 'भूकंप अभ्यास' : 'Earthquake Drill',
      description: language === 'hi' ?'भूकंप के दौरान सुरक्षा प्रोटोकॉल सीखें। Drop, Cover, Hold On तकनीक का अभ्यास करें।' :'Learn safety protocols during earthquakes. Practice Drop, Cover, Hold On technique.',
      icon: 'Zap',
      color: 'bg-orange-500',
      image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg',
      duration: '15-20 min',
      difficulty: ['beginner', 'intermediate', 'advanced'],
      completionRate: userProgress?.earthquake || 0,
      lastCompleted: userProgress?.earthquakeDate || null,
      keyLearnings: language === 'hi' 
        ? ['तुरंत रुकना', 'सुरक्षित स्थान खोजना', 'सिर की सुरक्षा']
        : ['Immediate stop', 'Find safe cover', 'Protect head']
    },
    {
      id: 'fire',
      title: language === 'hi' ? 'आग अभ्यास' : 'Fire Drill',
      description: language === 'hi' ?'आग की स्थिति में निकास प्रक्रिया सीखें। धुएं से बचाव और सुरक्षित निकास के तरीके।' :'Learn evacuation procedures during fire. Smoke protection and safe exit methods.',
      icon: 'Flame',
      color: 'bg-red-500',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg',
      duration: '10-15 min',
      difficulty: ['beginner', 'intermediate', 'advanced'],
      completionRate: userProgress?.fire || 0,
      lastCompleted: userProgress?.fireDate || null,
      keyLearnings: language === 'hi' 
        ? ['अलार्म बजाना', 'नीचे रहना', 'निकास खोजना']
        : ['Sound alarm', 'Stay low', 'Find exit']
    },
    {
      id: 'flood',
      title: language === 'hi' ? 'बाढ़ अभ्यास' : 'Flood Drill',
      description: language === 'hi' ?'बाढ़ की स्थिति में सुरक्षा उपाय। ऊंची जगह जाना और बचाव के लिए संकेत देना।' :'Safety measures during floods. Moving to higher ground and signaling for rescue.',
      icon: 'CloudRain',
      color: 'bg-blue-500',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
      duration: '12-18 min',
      difficulty: ['beginner', 'intermediate', 'advanced'],
      completionRate: userProgress?.flood || 0,
      lastCompleted: userProgress?.floodDate || null,
      keyLearnings: language === 'hi' 
        ? ['ऊंची जगह जाना', 'बिजली बंद करना', 'सहायता मांगना']
        : ['Move to higher ground', 'Turn off electricity', 'Signal for help']
    },
    {
      id: 'cyclone',
      title: language === 'hi' ? 'चक्रवात अभ्यास' : 'Cyclone Drill',
      description: language === 'hi' ?'चक्रवात के दौरान सुरक्षा। मजबूत संरचना में शरण और तेज हवाओं से बचाव।' :'Safety during cyclones. Shelter in strong structures and protection from high winds.',
      icon: 'Wind',
      color: 'bg-purple-500',
      image: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg',
      duration: '15-25 min',
      difficulty: ['intermediate', 'advanced'],
      completionRate: userProgress?.cyclone || 0,
      lastCompleted: userProgress?.cycloneDate || null,
      keyLearnings: language === 'hi' 
        ? ['मजबूत कमरे में जाना', 'खिड़कियों से दूर रहना', 'आपूर्ति तैयार करना']
        : ['Move to strong room', 'Stay away from windows', 'Prepare supplies']
    }
  ];

  const difficultyLevels = [
    {
      id: 'beginner',
      label: language === 'hi' ? 'शुरुआती' : 'beginner',
      description: language === 'hi' ? 'बुनियादी सुरक्षा चरण' : 'Basic safety steps',
      icon: 'BookOpen'
    },
    {
      id: 'intermediate',
      label: language === 'hi' ? 'मध्यम' : 'Intermediate',
      description: language === 'hi' ? 'जटिल परिस्थितियां' : 'Complex scenarios',
      icon: 'Target'
    },
    {
      id: 'advanced',
      label: language === 'hi' ? 'उन्नत' : 'Advanced',
      description: language === 'hi' ? 'नेतृत्व और निर्णय' : 'Leadership & decisions',
      icon: 'Crown'
    }
  ];

  const handleScenarioSelect = (scenario) => {
    onScenarioSelect(scenario?.id, selectedDifficulty);
  };

  const getCompletionColor = (rate) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-blue-600';
    if (rate >= 40) return 'text-yellow-600';
    return 'text-gray-400';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {language === 'hi' ? 'आपदा परिदृश्य चुनें' : 'Choose Disaster Scenario'}
        </h2>
        <p className="text-gray-600">
          {language === 'hi' ?'अभ्यास के लिए आपदा का प्रकार और कठिनाई स्तर चुनें।' :'Select disaster type and difficulty level for practice.'
          }
        </p>
      </div>
      {/* Difficulty Selector */}
      {/* 
       */}
      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios?.filter(scenario => scenario?.difficulty?.includes(selectedDifficulty))?.map((scenario) => (
            <div
              key={scenario?.id}
              className={`relative rounded-lg border-2 overflow-hidden transition-all duration-200 cursor-pointer ${
                selectedScenario === scenario?.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => handleScenarioSelect(scenario)}
            >
              {/* Image Header */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={scenario?.image}
                  alt={scenario?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Scenario Icon */}
                <div className={`absolute top-3 left-3 w-10 h-10 ${scenario?.color} rounded-full flex items-center justify-center`}>
                  <Icon name={scenario?.icon} size={20} color="white" />
                </div>

                {/* Completion Badge */}
                {scenario?.completionRate > 0 && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className={`text-xs font-medium ${getCompletionColor(scenario?.completionRate)}`}>
                      {scenario?.completionRate}%
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {scenario?.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Icon name="Clock" size={12} />
                    <span>{scenario?.duration}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {scenario?.description}
                </p>

                {/* Key Learnings */}
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'मुख्य सीख' : 'Key Learnings'}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {scenario?.keyLearnings?.map((learning, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                      >
                        {learning}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                {scenario?.completionRate > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>{language === 'hi' ? 'प्रगति' : 'Progress'}</span>
                      <span>{scenario?.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${scenario?.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Last Completed */}
                {scenario?.lastCompleted && (
                  <div className="text-xs text-gray-500 mb-3">
                    {language === 'hi' ? 'अंतिम बार पूर्ण' : 'Last completed'}: {' '}
                    {new Date(scenario.lastCompleted)?.toLocaleDateString()}
                  </div>
                )}

                {/* Action Button */}
                <Button
                  variant={selectedScenario === scenario?.id ? "primary" : "outline"}
                  size="sm"
                  fullWidth
                  iconName={scenario?.completionRate > 0 ? "RotateCcw" : "Play"}
                  iconSize={16}
                >
                  {scenario?.completionRate > 0 
                    ? (language === 'hi' ? 'फिर से अभ्यास करें' : 'Practice Again')
                    : (language === 'hi' ? 'अभ्यास शुरू करें' : 'Start Practice')
                  }
                </Button>
              </div>

              {/* Selection Indicator */}
              {selectedScenario === scenario?.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </div>
          ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">
              {Object.values(userProgress)?.filter(rate => rate > 0)?.length}
            </div>
            <div className="text-xs text-gray-500">
              {language === 'hi' ? 'पूर्ण अभ्यास' : 'Completed Drills'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">
              {Math.round(Object.values(userProgress)?.reduce((a, b) => a + b, 0) / Object.values(userProgress)?.length) || 0}%
            </div>
            <div className="text-xs text-gray-500">
              {language === 'hi' ? 'औसत स्कोर' : 'Average Score'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">
              {scenarios?.length}
            </div>
            <div className="text-xs text-gray-500">
              {language === 'hi' ? 'उपलब्ध परिदृश्य' : 'Available Scenarios'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[px] font-semibold text-gray-800">
              {selectedDifficulty === 'beginner' ? '★' : selectedDifficulty === 'intermediate' ? '★★' : '★★★'}
            </div>
            <div className="text-xs text-gray-500">
              {language === 'hi' ? 'कठिनाई स्तर' : 'Difficulty Level'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;