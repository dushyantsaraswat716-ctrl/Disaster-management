import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RoleSelector from './components/RoleSelector';
import LanguageSelector from './components/LanguageSelector';
import InstitutionalBranding from './components/InstitutionalBranding';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRole, setSelectedRole] = useState('student');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('currentLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');
    const rememberLogin = localStorage.getItem('rememberLogin');
    
    if (userRole && rememberLogin === 'true') {
      switch (userRole) {
        case 'student': navigate('/student-dashboard');
          break;
        case 'teacher': case'admin': navigate('/teacher-dashboard');
          break;
        default:
          navigate('/student-dashboard');
      }
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Language Selector and Time */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={24} className="text-primary" />
              <span className="font-semibold text-foreground">SafetyPrep Academy</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{formatTime(currentTime)}</span>
                <span className="text-border">|</span>
                <span>{formatDate(currentTime)}</span>
              </div>
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            {/* Left Column - Branding */}
            <div className="hidden lg:block">
              <InstitutionalBranding selectedLanguage={selectedLanguage} />
            </div>

            {/* Right Column - Login Form */}
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-card rounded-2xl shadow-card-elevated border border-border p-8">
                {/* Mobile Branding */}
                <div className="lg:hidden mb-8">
                  <InstitutionalBranding selectedLanguage={selectedLanguage} />
                </div>

                {/* Login Form */}
                <LoginForm 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                />

                {/* Role Selector */}
                <RoleSelector 
                  selectedRole={selectedRole}
                  onRoleSelect={handleRoleSelect}
                  selectedLanguage={selectedLanguage}
                />

                {/* Mock Credentials Info */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Info" size={16} className="mr-2 text-primary" />
                    Demo Credentials
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Student:</span>
                      <span className="font-mono text-foreground">student@safetyprep.edu / Student@123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teacher:</span>
                      <span className="font-mono text-foreground">teacher@safetyprep.edu / Teacher@456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Admin:</span>
                      <span className="font-mono text-foreground">admin@safetyprep.edu / Admin@789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Institution Code:</span>
                      <span className="font-mono text-foreground">SAFETY2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} SafetyPrep Academy</span>
              <span className="text-border">|</span>
              <span>NDMA Certified Platform</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <button className="text-error hover:text-error/80 transition-colors flex items-center space-x-1">
                <Icon name="Phone" size={14} />
                <span>Emergency: 112</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;