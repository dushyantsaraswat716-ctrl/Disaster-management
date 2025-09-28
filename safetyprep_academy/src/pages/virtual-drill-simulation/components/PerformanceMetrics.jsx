import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceMetrics = ({ 
  simulationData, 
  isActive, 
  language = 'en',
  onExportReport 
}) => {
  const [metrics, setMetrics] = useState({
    responseTime: 0,
    protocolAdherence: 0,
    safetyScore: 0,
    completionRate: 0,
    mistakeCount: 0,
    timeToSafety: 0
  });

  const [feedback, setFeedback] = useState([]);
  const [showDetailedReport, setShowDetailedReport] = useState(false);

  useEffect(() => {
    if (simulationData) {
      calculateMetrics(simulationData);
      generateFeedback(simulationData);
    }
  }, [simulationData]);

  const calculateMetrics = (data) => {
    const newMetrics = {
      responseTime: data?.responseTime || Math.floor(Math.random() * 15) + 5,
      protocolAdherence: data?.protocolScore || Math.floor(Math.random() * 30) + 70,
      safetyScore: data?.safetyScore || Math.floor(Math.random() * 25) + 75,
      completionRate: data?.completionRate || Math.floor(Math.random() * 20) + 80,
      mistakeCount: data?.mistakes || Math.floor(Math.random() * 3),
      timeToSafety: data?.timeToSafety || Math.floor(Math.random() * 45) + 30
    };
    setMetrics(newMetrics);
  };

  const generateFeedback = (data) => {
    const feedbackItems = [
      {
        type: 'success',
        message: language === 'hi' ?'उत्कृष्ट! आपने तुरंत प्रतिक्रिया दी।' :'Excellent! You responded immediately.',
        icon: 'CheckCircle'
      },
      {
        type: 'warning',
        message: language === 'hi' ?'सुधार की आवश्यकता: सुरक्षा प्रोटोकॉल का बेहतर पालन करें।' :'Needs improvement: Better adherence to safety protocols.',
        icon: 'AlertTriangle'
      },
      {
        type: 'info',
        message: language === 'hi' ?'सुझाव: आपातकालीन संपर्कों को याद रखें।' :'Tip: Remember emergency contact numbers.',
        icon: 'Info'
      }
    ];
    setFeedback(feedbackItems);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'C+';
    if (score >= 65) return 'C';
    return 'D';
  };

  const metricCards = [
    {
      title: language === 'hi' ? 'प्रतिक्रिया समय' : 'Response Time',
      value: `${metrics?.responseTime}s`,
      icon: 'Timer',
      description: language === 'hi' ? 'अलर्ट से कार्य तक' : 'Alert to action'
    },
    {
      title: language === 'hi' ? 'प्रोटोकॉल पालन' : 'Protocol Adherence',
      value: `${metrics?.protocolAdherence}%`,
      icon: 'CheckSquare',
      description: language === 'hi' ? 'सही चरणों का पालन' : 'Correct steps followed'
    },
    {
      title: language === 'hi' ? 'सुरक्षा स्कोर' : 'Safety Score',
      value: `${metrics?.safetyScore}%`,
      icon: 'Shield',
      description: language === 'hi' ? 'समग्र सुरक्षा रेटिंग' : 'Overall safety rating'
    },
    {
      title: language === 'hi' ? 'पूर्णता दर' : 'Completion Rate',
      value: `${metrics?.completionRate}%`,
      icon: 'Target',
      description: language === 'hi' ? 'कार्यों की पूर्णता' : 'Tasks completed'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {language === 'hi' ? 'प्रदर्शन मेट्रिक्स' : 'Performance Metrics'}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetailedReport(!showDetailedReport)}
            iconName="BarChart3"
            iconSize={16}
          >
            {language === 'hi' ? 'विस्तृत रिपोर्ट' : 'Detailed Report'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onExportReport}
            iconName="Download"
            iconSize={16}
          >
            {language === 'hi' ? 'निर्यात' : 'Export'}
          </Button>
        </div>
      </div>
      {/* Overall Score */}
      <div className={`${getScoreBackground(metrics?.safetyScore)} rounded-lg p-6 mb-6`}>
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(metrics?.safetyScore)} mb-2`}>
            {metrics?.safetyScore}%
          </div>
          <div className="text-lg font-medium text-gray-700 mb-1">
            {language === 'hi' ? 'समग्र स्कोर' : 'Overall Score'}
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            metrics?.safetyScore >= 90 ? 'bg-green-200 text-green-800' :
            metrics?.safetyScore >= 75 ? 'bg-blue-200 text-blue-800' :
            metrics?.safetyScore >= 60 ? 'bg-yellow-200 text-yellow-800': 'bg-red-200 text-red-800'
          }`}>
            {language === 'hi' ? 'ग्रेड' : 'Grade'}: {getGrade(metrics?.safetyScore)}
          </div>
        </div>
      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricCards?.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} className="text-blue-500" />
              <span className="text-lg font-semibold text-gray-800">
                {metric?.value}
              </span>
            </div>
            <h3 className="font-medium text-sm text-gray-700 mb-1">
              {metric?.title}
            </h3>
            <p className="text-xs text-gray-500">
              {metric?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Time Metrics */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">
            {language === 'hi' ? 'समय मेट्रिक्स' : 'Time Metrics'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {language === 'hi' ? 'सुरक्षा तक समय' : 'Time to Safety'}
              </span>
              <span className="font-medium">{metrics?.timeToSafety}s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {language === 'hi' ? 'गलतियों की संख्या' : 'Mistake Count'}
              </span>
              <span className={`font-medium ${metrics?.mistakeCount === 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metrics?.mistakeCount}
              </span>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">
            {language === 'hi' ? 'उपलब्धियां' : 'Achievements'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {metrics?.responseTime <= 10 && (
              <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                <Icon name="Zap" size={12} className="mr-1" />
                {language === 'hi' ? 'तेज़ प्रतिक्रिया' : 'Quick Response'}
              </div>
            )}
            {metrics?.mistakeCount === 0 && (
              <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                <Icon name="Award" size={12} className="mr-1" />
                {language === 'hi' ? 'त्रुटिहीन' : 'Flawless'}
              </div>
            )}
            {metrics?.protocolAdherence >= 90 && (
              <div className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                <Icon name="Star" size={12} className="mr-1" />
                {language === 'hi' ? 'प्रोटोकॉल मास्टर' : 'Protocol Master'}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Feedback Section */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">
          {language === 'hi' ? 'फीडबैक और सुझाव' : 'Feedback & Suggestions'}
        </h3>
        <div className="space-y-3">
          {feedback?.map((item, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                item?.type === 'success' ? 'bg-green-50 border border-green-200' :
                item?.type === 'warning'? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={16} 
                className={
                  item?.type === 'success' ? 'text-green-600' :
                  item?.type === 'warning'? 'text-yellow-600' : 'text-blue-600'
                }
              />
              <p className="text-sm text-gray-700">{item?.message}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Detailed Report */}
      {showDetailedReport && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-700 mb-4">
            {language === 'hi' ? 'विस्तृत विश्लेषण' : 'Detailed Analysis'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-600">
                {language === 'hi' ? 'मजबूत बिंदु' : 'Strengths'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-green-500" />
                  <span>
                    {language === 'hi' ?'तुरंत सुरक्षा प्रोटोकॉल का पालन किया' :'Immediately followed safety protocols'
                    }
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-green-500" />
                  <span>
                    {language === 'hi' ?'सही निकास मार्ग चुना' :'Chose correct evacuation route'
                    }
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-600">
                {language === 'hi' ? 'सुधार के क्षेत्र' : 'Areas for Improvement'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={14} className="text-yellow-500" />
                  <span>
                    {language === 'hi' ?'आपातकालीन संपर्क तुरंत याद करें' :'Memorize emergency contacts faster'
                    }
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={14} className="text-yellow-500" />
                  <span>
                    {language === 'hi' ?'अधिक अभ्यास की आवश्यकता' :'Need more practice sessions'
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;