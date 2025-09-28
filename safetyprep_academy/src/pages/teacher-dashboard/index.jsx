import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import QuickEmergencyAccess from '../../components/ui/QuickEmergencyAccess';
import ClassOverviewCard from './components/ClassOverviewCard';
import StudentProgressTable from './components/StudentProgressTable';
import DrillScheduler from './components/DrillScheduler';
import QuickActions from './components/QuickActions';
import AnalyticsPanel from './components/AnalyticsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for teacher dashboard
  const classOverviewData = [
    {
      title: "Total Students",
      value: 120,
      total: 120,
      percentage: 100,
      icon: "Users",
      color: "primary",
      description: "Across all classes"
    },
    {
      title: "Active Participation",
      value: 104,
      total: 120,
      percentage: 87,
      icon: "UserCheck",
      color: "success",
      trend: "up",
      trendValue: "+5%",
      description: "This week"
    },
    {
      title: "Drills Completed",
      value: 8,
      total: 10,
      percentage: 80,
      icon: "Play",
      color: "warning",
      trend: "up",
      trendValue: "+2",
      description: "This month"
    },
    {
      title: "Readiness Score",
      value: 82,
      total: 100,
      percentage: 82,
      icon: "Shield",
      color: "primary",
      trend: "up",
      trendValue: "+3%",
      description: "Overall average"
    }
  ];

  const studentsData = [
    {
      id: 1,
      name: "Aarav Sharma",
      class: "6A",
      completedModules: 8,
      totalModules: 10,
      drillsCompleted: 5,
      totalDrills: 6,
      readinessScore: 92,
      status: "excellent",
      lastActive: "2025-09-16T10:30:00"
    },
    {
      id: 2,
      name: "Priya Patel",
      class: "6A",
      completedModules: 7,
      totalModules: 10,
      drillsCompleted: 4,
      totalDrills: 6,
      readinessScore: 85,
      status: "good",
      lastActive: "2025-09-16T09:15:00"
    },
    {
      id: 3,
      name: "Arjun Singh",
      class: "6B",
      completedModules: 6,
      totalModules: 10,
      drillsCompleted: 3,
      totalDrills: 6,
      readinessScore: 78,
      status: "good",
      lastActive: "2025-09-15T16:45:00"
    },
    {
      id: 4,
      name: "Ananya Reddy",
      class: "6B",
      completedModules: 9,
      totalModules: 10,
      drillsCompleted: 6,
      totalDrills: 6,
      readinessScore: 95,
      status: "excellent",
      lastActive: "2025-09-16T11:20:00"
    },
    {
      id: 5,
      name: "Vikram Kumar",
      class: "7A",
      completedModules: 4,
      totalModules: 10,
      drillsCompleted: 2,
      totalDrills: 6,
      readinessScore: 58,
      status: "needs-improvement",
      lastActive: "2025-09-14T14:30:00"
    },
    {
      id: 6,
      name: "Kavya Nair",
      class: "7A",
      completedModules: 8,
      totalModules: 10,
      drillsCompleted: 5,
      totalDrills: 6,
      readinessScore: 88,
      status: "good",
      lastActive: "2025-09-16T08:45:00"
    }
  ];

  const upcomingDrills = [
    {
      id: 1,
      title: "Earthquake Response Drill",
      type: "earthquake",
      date: "2025-09-18",
      time: "10:00",
      duration: "15",
      classes: ["6A", "6B", "7A"],
      instructions: "Focus on drop, cover, and hold techniques"
    },
    {
      id: 2,
      title: "Fire Evacuation Practice",
      type: "fire",
      date: "2025-09-20",
      time: "14:30",
      duration: "20",
      classes: ["7B", "8A", "8B"],
      instructions: "Practice using alternate evacuation routes"
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate emergency alert check
    const checkEmergencyStatus = () => {
      const emergencyStatus = localStorage.getItem('emergencyActive');
      setIsEmergencyActive(emergencyStatus === 'true');
    };

    checkEmergencyStatus();
    const interval = setInterval(checkEmergencyStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleStudentSelect = (student) => {
    // Navigate to student profile or show detailed view
    console.log('Selected student:', student);
  };

  const handleBulkAction = (action, studentIds) => {
    console.log('Bulk action:', action, 'for students:', studentIds);
    
    switch (action) {
      case 'assign-module':
        // Handle module assignment
        break;
      case 'schedule-drill':
        // Handle drill scheduling
        break;
      case 'message':
        // Handle messaging
        break;
      default:
        break;
    }
  };

  const handleScheduleDrill = (drillData) => {
    console.log('Scheduling drill:', drillData);
    // Add drill to upcoming drills list
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    
    switch (actionId) {
      case 'emergency-drill': navigate('/virtual-drill-simulation');
        break;
      case 'send-alert': navigate('/disaster-alerts');
        break;
      case 'attendance-check':
        // Handle attendance check
        break;
      case 'evacuation-status':
        // Handle evacuation status
        break;
      default:
        break;
    }
  };

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'drills', label: 'Drills', icon: 'Play' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const renderContent = () => {
    switch (selectedView) {
      case 'students':
        return (
          <StudentProgressTable
            students={studentsData}
            onStudentSelect={handleStudentSelect}
            onBulkAction={handleBulkAction}
          />
        );
      case 'drills':
        return (
          <DrillScheduler
            onScheduleDrill={handleScheduleDrill}
            upcomingDrills={upcomingDrills}
          />
        );
      case 'analytics':
        return <AnalyticsPanel />;
      default:
        return (
          <div className="space-y-6">
            {/* Class Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {classOverviewData?.map((card, index) => (
                <ClassOverviewCard key={index} {...card} />
              ))}
            </div>
            {/* Recent Activity & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StudentProgressTable
                  students={studentsData?.slice(0, 4)}
                  onStudentSelect={handleStudentSelect}
                  onBulkAction={handleBulkAction}
                />
              </div>
              <div>
                <QuickActions
                  onAction={handleQuickAction}
                  isEmergencyActive={isEmergencyActive}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Alert Banner */}
      <EmergencyAlertBanner
        isActive={isEmergencyActive}
        alertType="general"
        message="Emergency drill scheduled for 10:00 AM today. Please ensure all students are prepared."
        onDismiss={() => setIsEmergencyActive(false)}
        autoHide={false}
      />
      {/* Header */}
      <Header userRole="teacher" isEmergencyActive={isEmergencyActive} />
      {/* Main Content */}
      <main className={`${isEmergencyActive ? 'pt-12' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Monitor student progress and manage classroom safety activities
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/virtual-drill-simulation')}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Drill
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/disaster-alerts')}
                  iconName="AlertTriangle"
                  iconPosition="left"
                >
                  Send Alert
                </Button>
              </div>
            </div>

            {/* View Navigation */}
            <div className="flex items-center space-x-1 mt-6 bg-muted/30 p-1 rounded-lg w-fit">
              {viewOptions?.map((option) => (
                <button
                  key={option?.id}
                  onClick={() => setSelectedView(option?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    selectedView === option?.id
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span>{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </main>
      {/* Quick Emergency Access */}
      <QuickEmergencyAccess
        position="bottom-right"
        userRole="teacher"
        isEmergencyActive={isEmergencyActive}
      />
    </div>
  );
};

export default TeacherDashboard;