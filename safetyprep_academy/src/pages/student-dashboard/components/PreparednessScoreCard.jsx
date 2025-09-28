import React from 'react';
import Icon from '../../../components/AppIcon';
import { EmergencyReadiness } from '../../../components/ui/ProgressIndicator';

const PreparednessScoreCard = ({ 
  score, 
  maxScore = 100, 
  lastUpdated, 
  recommendations = [],
  regionalRisk = 'medium' 
}) => {
  const getScoreLevel = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { level: 'Excellent', color: 'text-success', icon: 'CheckCircle' };
    if (percentage >= 75) return { level: 'Good', color: 'text-primary', icon: 'TrendingUp' };
    if (percentage >= 50) return { level: 'Fair', color: 'text-warning', icon: 'AlertTriangle' };
    return { level: 'Needs Improvement', color: 'text-error', icon: 'AlertCircle' };
  };

  const getRiskColor = (risk) => {
    const colors = {
      low: 'text-success bg-success/10 border-success/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      high: 'text-error bg-error/10 border-error/20'
    };
    return colors?.[risk] || colors?.medium;
  };

  const scoreInfo = getScoreLevel();

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Preparedness Score</h3>
          <p className="text-sm text-muted-foreground">Your overall emergency readiness</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name={scoreInfo?.icon} size={20} className={scoreInfo?.color} />
            <span className={`text-2xl font-bold ${scoreInfo?.color}`}>{score}</span>
            <span className="text-lg text-muted-foreground">/{maxScore}</span>
          </div>
          <p className={`text-sm font-medium ${scoreInfo?.color}`}>{scoreInfo?.level}</p>
        </div>
      </div>
      <EmergencyReadiness
        readinessScore={score}
        maxScore={maxScore}
        lastUpdated={lastUpdated}
        className="mb-6"
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Regional Risk Level</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getRiskColor(regionalRisk)}`}>
            {regionalRisk?.charAt(0)?.toUpperCase() + regionalRisk?.slice(1)}
          </span>
        </div>

        {recommendations?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Recommendations</h4>
            <div className="space-y-2">
              {recommendations?.slice(0, 3)?.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreparednessScoreCard;