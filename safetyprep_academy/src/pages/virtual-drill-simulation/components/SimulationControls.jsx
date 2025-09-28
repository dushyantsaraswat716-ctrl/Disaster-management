import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SimulationControls = ({ 
  isActive, 
  isPaused, 
  onStart, 
  onPause, 
  onResume, 
  onStop, 
  onRestart,
  scenario,
  language = 'en',
  simulationTime = 0
}) => {
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleEmergencyStop = () => {
    onStop();
    // Simulate emergency call
    window.location.href = 'tel:112';
  };

  const scenarioLabels = {
    earthquake: language === 'hi' ? 'भूकंप' : 'Earthquake',
    fire: language === 'hi' ? 'आग' : 'Fire',
    flood: language === 'hi' ? 'बाढ़' : 'Flood'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            isActive && !isPaused ? 'bg-green-500 animate-pulse' : isPaused ?'bg-yellow-500' : 'bg-gray-400'
          }`}></div>
          <h3 className="font-medium text-gray-800">
            {scenarioLabels?.[scenario]} {language === 'hi' ? 'सिमुलेशन' : 'Simulation'}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Icon name="Clock" size={16} />
          <span className="font-mono">{formatTime(simulationTime)}</span>
        </div>
      </div>
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-3 mb-4">
        {!isActive ? (
          <Button
            variant="success"
            onClick={onStart}
            iconName="Play"
            iconSize={20}
            className="px-6"
          >
            {language === 'hi' ? 'शुरू करें' : 'Start Drill'}
          </Button>
        ) : (
          <>
            {isPaused ? (
              <Button
                variant="primary"
                onClick={onResume}
                iconName="Play"
                iconSize={18}
              >
                {language === 'hi' ? 'जारी रखें' : 'Resume'}
              </Button>
            ) : (
              <Button
                variant="warning"
                onClick={onPause}
                iconName="Pause"
                iconSize={18}
              >
                {language === 'hi' ? 'रोकें' : 'Pause'}
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={onStop}
              iconName="Square"
              iconSize={18}
            >
              {language === 'hi' ? 'बंद करें' : 'Stop'}
            </Button>
            
            <Button
              variant="outline"
              onClick={onRestart}
              iconName="RotateCcw"
              iconSize={18}
            >
              {language === 'hi' ? 'फिर से' : 'Restart'}
            </Button>
          </>
        )}
      </div>
      {/* Secondary Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Icon name="Volume2" size={16} className="text-gray-500" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e?.target?.value)}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500 w-8">{volume}%</span>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            iconName="Settings"
            iconSize={16}
          >
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
            iconName={isFullscreen ? "Minimize" : "Maximize"}
            iconSize={16}
          >
          </Button>

          {/* Emergency Stop */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEmergencyStop}
            iconName="Phone"
            iconSize={16}
          >
            {language === 'hi' ? 'आपातकाल' : 'Emergency'}
          </Button>
        </div>
      </div>
      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            {language === 'hi' ? 'सेटिंग्स' : 'Settings'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Audio Settings */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">
                {language === 'hi' ? 'ऑडियो निर्देश' : 'Audio Instructions'}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="audio-enabled"
                  defaultChecked
                  className="rounded border-gray-300"
                />
                <label htmlFor="audio-enabled" className="text-sm text-gray-700">
                  {language === 'hi' ? 'सक्षम करें' : 'Enable'}
                </label>
              </div>
            </div>

            {/* Visual Effects */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">
                {language === 'hi' ? 'दृश्य प्रभाव' : 'Visual Effects'}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="effects-enabled"
                  defaultChecked
                  className="rounded border-gray-300"
                />
                <label htmlFor="effects-enabled" className="text-sm text-gray-700">
                  {language === 'hi' ? 'एनिमेशन' : 'Animations'}
                </label>
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">
                {language === 'hi' ? 'कठिनाई स्तर' : 'Difficulty Level'}
              </label>
              <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                <option value="beginner">
                  {language === 'hi' ? 'शुरुआती' : 'Beginner'}
                </option>
                <option value="intermediate">
                  {language === 'hi' ? 'मध्यम' : 'Intermediate'}
                </option>
                <option value="advanced">
                  {language === 'hi' ? 'उन्नत' : 'Advanced'}
                </option>
              </select>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">
                {language === 'hi' ? 'गति नियंत्रण' : 'Speed Control'}
              </label>
              <select className="w-full text-sm border border-gray-300 rounded px-2 py-1">
                <option value="0.5x">0.5x</option>
                <option value="1x" selected>1x</option>
                <option value="1.5x">1.5x</option>
                <option value="2x">2x</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {/* Status Indicators */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{language === 'hi' ? 'कनेक्शन सक्रिय' : 'Connection Active'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Wifi" size={12} />
              <span>{language === 'hi' ? 'ऑनलाइन' : 'Online'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>{language === 'hi' ? 'सुरक्षित मोड' : 'Safe Mode'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;