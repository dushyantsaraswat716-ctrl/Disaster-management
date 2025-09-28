import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import QuickEmergencyAccess from '../../components/ui/QuickEmergencyAccess';
import ProgressOverviewCard from './components/ProgressOverviewCard';
import QuickActionTile from './components/QuickActionTile';
import UpcomingDrillCard from './components/UpcomingDrillCard';
import AchievementBadge from './components/AchievementBadge';
import PreparednessScoreCard from './components/PreparednessScoreCard';
import LanguageSwitcher from './components/LanguageSwitcher';
import EmergencyContactsQuick from './components/EmergencyContactsQuick';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [studentData, setStudentData] = useState(null);

  // Mock student data
  const mockStudentData = {
    name: "Arjun Sharma",
    class: "Class 10-A",
    school: "Delhi Public School, Mumbai",
    studentId: "DPS2024001",
    preparednessScore: 78,
    totalPoints: 1250,
    currentStreak: 5,
    progress: {
      earthquake: { completed: 8, total: 10, achievements: ['Quick Learner', 'Safety Star'] },
      flood: { completed: 6, total: 8, achievements: ['First Drill'] },
      fire: { completed: 10, total: 10, achievements: ['Expert', 'Perfect Score'] },
      cyclone: { completed: 3, total: 6, achievements: [] }
    },
    recentAchievements: [
      {
        id: 1,
        name: 'Fire Safety Expert',
        description: 'Completed all fire safety modules',
        icon: 'Award',
        category: 'learning',
        earnedAt: '2025-01-15T10:30:00Z'
      },
      {
        id: 2,
        name: '5-Day Streak',
        description: 'Practiced safety drills for 5 consecutive days',
        icon: 'Zap',
        category: 'streak',
        earnedAt: '2025-01-14T16:45:00Z'
      },
      {
        id: 3,
        name: 'Quick Responder',
        description: 'Completed emergency drill in record time',
        icon: 'Clock',
        category: 'drill',
        earnedAt: '2025-01-13T14:20:00Z'
      }
    ],
    upcomingDrills: [
      {
        id: 1,
        title: 'Monthly Fire Drill',
        type: 'fire',
        scheduledAt: '2025-01-18T10:00:00Z',
        location: 'Main Building',
        participants: 450
      },
      {
        id: 2,
        title: 'Earthquake Simulation',
        type: 'earthquake',
        scheduledAt: '2025-01-20T14:30:00Z',
        location: 'All Buildings',
        participants: 1200
      }
    ],
    recommendations: [
      "Complete remaining cyclone preparedness modules",
      "Practice earthquake drop-cover-hold technique",
      "Review emergency evacuation routes for your building"
    ]
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Simulate loading student data
    setStudentData(mockStudentData);
    
    // Check for active emergency alerts (mock)
    const checkEmergencyStatus = () => {
      // In real app, this would check NDMA/IMD APIs
      const isEmergency = localStorage.getItem('emergencyActive') === 'true';
      setIsEmergencyActive(isEmergency);
    };
    
    checkEmergencyStatus();
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    // In real app, this would trigger content translation
  };

  const handleProgressCardClick = (disasterType) => {
    navigate('/virtual-drill-simulation', { state: { selectedType: disasterType } });
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'start-learning': navigate('/virtual-drill-simulation');
        break;
      case 'join-drill': navigate('/virtual-drill-simulation', { state: { mode: 'live' } });
        break;
      case 'emergency-protocols': navigate('/disaster-alerts');
        break;
      case 'view-contacts': navigate('/emergency-contacts');
        break;
      default:
        break;
    }
  };

  const handleDrillJoin = (drillId) => {
    navigate('/virtual-drill-simulation', { state: { drillId } });
  };

  const handleDrillRemind = (drillId) => {
    // Set reminder for drill
    alert('Reminder set! You will be notified 15 minutes before the drill.');
  };

  const handleEmergencyAlertDismiss = () => {
    setIsEmergencyActive(false);
    localStorage.setItem('emergencyActive', 'false');
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const progressData = [
    {
      disasterType: 'Earthquake Safety',
      progress: studentData?.progress?.earthquake?.completed,
      total: studentData?.progress?.earthquake?.total,
      icon: 'Zap',
      color: 'bg-error',
      achievements: studentData?.progress?.earthquake?.achievements
    },
    {
      disasterType: 'Flood Preparedness',
      progress: studentData?.progress?.flood?.completed,
      total: studentData?.progress?.flood?.total,
      icon: 'CloudRain',
      color: 'bg-primary',
      achievements: studentData?.progress?.flood?.achievements
    },
    {
      disasterType: 'Fire Safety',
      progress: studentData?.progress?.fire?.completed,
      total: studentData?.progress?.fire?.total,
      icon: 'Flame',
      color: 'bg-warning',
      achievements: studentData?.progress?.fire?.achievements
    },
    {
      disasterType: 'Cyclone Response',
      progress: studentData?.progress?.cyclone?.completed,
      total: studentData?.progress?.cyclone?.total,
      icon: 'Wind',
      color: 'bg-secondary',
      achievements: studentData?.progress?.cyclone?.achievements
    }
  ];

  const quickActions = [
    {
      title: 'Start Learning',
      description: 'Begin new disaster preparedness modules and interactive lessons',
      icon: 'BookOpen',
      color: 'bg-primary',
      actionText: 'Start Module',
      action: 'start-learning',
      isNew: true
    },
    {
      title: 'Join Live Drill',
      description: 'Participate in real-time emergency simulation exercises',
      icon: 'Play',
      color: 'bg-success',
      actionText: 'Join Now',
      action: 'join-drill',
      badge: 'Live'
    },
    {
      title: 'Emergency Protocols',
      description: 'Quick access to safety procedures and evacuation plans',
      icon: 'Shield',
      color: 'bg-error',
      actionText: 'View Protocols',
      action: 'emergency-protocols'
    },
    {
      title: 'Emergency Contacts',
      description: 'Access important contact numbers and communication tools',
      icon: 'Phone',
      color: 'bg-accent',
      actionText: 'View Contacts',
      action: 'view-contacts'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Alert Banner */}
      {isEmergencyActive && (
        <EmergencyAlertBanner
          isActive={true}
          alertType="general"
          message="Emergency drill scheduled for today at 2:30 PM. Please be prepared to participate."
          onDismiss={handleEmergencyAlertDismiss}
          autoHide={false}
        />
      )}
      {/* Header */}
      <Header userRole="student" isEmergencyActive={isEmergencyActive} />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, {studentData?.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {studentData?.class} • {studentData?.school}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher onLanguageChange={handleLanguageChange} />
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-xl font-bold text-primary">{studentData?.totalPoints?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Target" size={24} className="text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{studentData?.preparednessScore}%</p>
            <p className="text-sm text-muted-foreground">Preparedness Score</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Zap" size={24} className="text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{studentData?.currentStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Award" size={24} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{studentData?.recentAchievements?.length}</p>
            <p className="text-sm text-muted-foreground">New Badges</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-6">Learning Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {progressData?.map((item, index) => (
                  <ProgressOverviewCard
                    key={index}
                    {...item}
                    onClick={() => handleProgressCardClick(item?.disasterType?.toLowerCase()?.split(' ')?.[0])}
                  />
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions?.map((action, index) => (
                  <QuickActionTile
                    key={index}
                    {...action}
                    onClick={() => handleQuickAction(action?.action)}
                  />
                ))}
              </div>
            </section>

            {/* Recent Achievements */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-6">Recent Achievements</h2>
              <div className="card p-6">
                <div className="space-y-4">
                  {studentData?.recentAchievements?.map((achievement) => (
                    <AchievementBadge key={achievement?.id} achievement={achievement} />
                  ))}
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  className="mt-4"
                  iconName="Trophy"
                  iconPosition="left"
                  iconSize={16}
                >
                  View All Achievements
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preparedness Score */}
            <PreparednessScoreCard
              score={studentData?.preparednessScore}
              lastUpdated={new Date()?.toISOString()}
              recommendations={studentData?.recommendations}
              regionalRisk="medium"
            />

            {/* Upcoming Drills */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Drills</h3>
              <div className="space-y-4">
                {studentData?.upcomingDrills?.map((drill) => (
                  <UpcomingDrillCard
                    key={drill?.id}
                    drill={drill}
                    onJoin={handleDrillJoin}
                    onRemind={handleDrillRemind}
                  />
                ))}
              </div>
            </section>

            {/* Emergency Contacts */}
            <EmergencyContactsQuick
              onViewAll={() => handleQuickAction('view-contacts')}
            />
          </div>
        </div>
      </main>
      {/* Quick Emergency Access */}
      <QuickEmergencyAccess
        userRole="student"
        isEmergencyActive={isEmergencyActive}
      />
    </div>
  );
};

export default StudentDashboard;