import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import QuickEmergencyAccess from '../../components/ui/QuickEmergencyAccess';

// Import components
import ScenarioSelector from './components/ScenarioSelector';
import SimulationEnvironment from './components/SimulationEnvironment';
import StepByStepGuide from './components/StepByStepGuide';
import SimulationControls from './components/SimulationControls';
import PerformanceMetrics from './components/PerformanceMetrics';

const VirtualDrillSimulation = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [userRole, setUserRole] = useState('student');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  // Simulation state
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [isSimulationPaused, setIsSimulationPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [simulationTime, setSimulationTime] = useState(0);
  const [simulationData, setSimulationData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Mock user progress data
  const [userProgress] = useState({
    earthquake: 85,
    earthquakeDate: '2024-01-15',
    fire: 92,
    fireDate: '2024-01-10',
    flood: 78,
    floodDate: '2024-01-05',
    cyclone: 0
  });

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Simulation timer
  useEffect(() => {
    let timer;
    if (isSimulationActive && !isSimulationPaused) {
      timer = setInterval(() => {
        setSimulationTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSimulationActive, isSimulationPaused]);

  const handleScenarioSelect = (scenarioId, difficulty) => {
    setSelectedScenario(scenarioId);
    setSelectedDifficulty(difficulty);
  };

  const handleStartSimulation = () => {
    if (!selectedScenario) {
      alert(language === 'hi' ? 'कृपया पहले एक परिदृश्य चुनें' : 'Please select a scenario first');
      return;
    }
    setIsSimulationActive(true);
    setIsSimulationPaused(false);
    setCurrentStep(1);
    setSimulationTime(0);
    setShowResults(false);
  };

  const handlePauseSimulation = () => {
    setIsSimulationPaused(true);
  };

  const handleResumeSimulation = () => {
    setIsSimulationPaused(false);
  };

  const handleStopSimulation = () => {
    setIsSimulationActive(false);
    setIsSimulationPaused(false);
    generateSimulationResults();
    setShowResults(true);
  };

  const handleRestartSimulation = () => {
    setCurrentStep(1);
    setSimulationTime(0);
    setIsSimulationPaused(false);
  };

  const handleStepComplete = (stepId) => {
    // Move to next step automatically
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1000);
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  const handleActionComplete = (actionType, actionData) => {
    console.log('Action completed:', actionType, actionData);
    // Update simulation data based on user actions
  };

  const generateSimulationResults = () => {
    const mockData = {
      responseTime: Math.floor(Math.random() * 15) + 5,
      protocolScore: Math.floor(Math.random() * 30) + 70,
      safetyScore: Math.floor(Math.random() * 25) + 75,
      completionRate: Math.floor(Math.random() * 20) + 80,
      mistakes: Math.floor(Math.random() * 3),
      timeToSafety: simulationTime
    };
    setSimulationData(mockData);
  };

  const handleExportReport = () => {
    const reportData = {
      scenario: selectedScenario,
      difficulty: selectedDifficulty,
      completionTime: simulationTime,
      metrics: simulationData,
      timestamp: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `drill-report-${selectedScenario}-${Date.now()}.json`;
    link?.click();
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Alert Banner */}
      <EmergencyAlertBanner
        isActive={isEmergencyActive}
        alertType="drill"
        message={language === 'hi' ?'आपातकालीन अभ्यास प्रगति में है - निर्देशों का पालन करें' :'Emergency drill in progress - Follow instructions'
        }
        onDismiss={() => setIsEmergencyActive(false)}
        autoHide={false}
      />
      {/* Header */}
      <Header 
        userRole={userRole}
        isEmergencyActive={isEmergencyActive}
      />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {language === 'hi' ? 'वर्चुअल ड्रिल सिमुलेशन' : 'Virtual Drill Simulation'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'hi' ?'इंटरैक्टिव आपदा प्रतिक्रिया प्रशिक्षण के माध्यम से तैयारी करें' :'Prepare through interactive disaster response training'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'hi' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  हिं
                </button>
              </div>

              {/* Emergency Toggle */}
              <Button
                variant={isEmergencyActive ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsEmergencyActive(!isEmergencyActive)}
                iconName="AlertTriangle"
                iconSize={16}
              >
                {language === 'hi' ? 'आपातकाल मोड' : 'Emergency Mode'}
              </Button>
            </div>
          </div>
        </div>

        {/* Simulation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Scenario Selection & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Scenario Selector */}
            <ScenarioSelector
              onScenarioSelect={handleScenarioSelect}
              selectedScenario={selectedScenario}
              language={language}
              userProgress={userProgress}
            />

            {/* Simulation Controls */}
            <SimulationControls
              isActive={isSimulationActive}
              isPaused={isSimulationPaused}
              onStart={handleStartSimulation}
              onPause={handlePauseSimulation}
              onResume={handleResumeSimulation}
              onStop={handleStopSimulation}
              onRestart={handleRestartSimulation}
              scenario={selectedScenario}
              language={language}
              simulationTime={simulationTime}
            />
          </div>

          {/* Center Column - Simulation Environment */}
          <div className="lg:col-span-2 space-y-6">
            {selectedScenario ? (
              <>
                {/* Simulation Environment */}
                <SimulationEnvironment
                  scenario={selectedScenario}
                  isActive={isSimulationActive && !isSimulationPaused}
                  onActionComplete={handleActionComplete}
                  currentStep={currentStep}
                  language={language}
                />

                {/* Step-by-Step Guide */}
                <StepByStepGuide
                  scenario={selectedScenario}
                  currentStep={currentStep}
                  onStepComplete={handleStepComplete}
                  onStepChange={handleStepChange}
                  language={language}
                  isAudioEnabled={true}
                />
              </>
            ) : (
              /* Placeholder when no scenario selected */
              (<div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Icon name="Play" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'सिमुलेशन शुरू करने के लिए तैयार' : 'Ready to Start Simulation'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {language === 'hi' ?'बाएं पैनल से एक आपदा परिदृश्य चुनें और अभ्यास शुरू करें।' :'Select a disaster scenario from the left panel and begin practice.'
                  }
                </p>
                <Button
                  variant="primary"
                  onClick={() => document.querySelector('.scenario-selector')?.scrollIntoView()}
                  iconName="ArrowLeft"
                  iconSize={16}
                >
                  {language === 'hi' ? 'परिदृश्य चुनें' : 'Choose Scenario'}
                </Button>
              </div>)
            )}
          </div>
        </div>

        {/* Performance Metrics - Full Width */}
        {showResults && simulationData && (
          <div className="mt-6">
            <PerformanceMetrics
              simulationData={simulationData}
              isActive={isSimulationActive}
              language={language}
              onExportReport={handleExportReport}
            />
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/student-dashboard')}
              iconName="ArrowLeft"
              iconSize={16}
            >
              {language === 'hi' ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/emergency-contacts')}
              iconName="Phone"
              iconSize={16}
            >
              {language === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/disaster-alerts')}
              iconName="AlertTriangle"
              iconSize={16}
            >
              {language === 'hi' ? 'आपदा अलर्ट' : 'Disaster Alerts'}
            </Button>
          </div>
        </div>
      </main>
      {/* Quick Emergency Access */}
      <QuickEmergencyAccess
        position="bottom-right"
        userRole={userRole}
        isEmergencyActive={isEmergencyActive}
      />
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-blue-500" />
              <span className="text-sm text-gray-600">
                SafetyPrep Academy - NDMA Certified Training Platform
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date()?.getFullYear()} SafetyPrep Academy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VirtualDrillSimulation;