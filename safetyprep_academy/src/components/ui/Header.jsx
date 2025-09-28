import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', isEmergencyActive = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [location?.pathname]);

  // Handle logout functionality
  const handleLogout = () => {
    // Clear all authentication-related localStorage items
    localStorage.removeItem('userRole');
    localStorage.removeItem('rememberLogin');
    localStorage.removeItem('currentLanguage');
    localStorage.removeItem('selectedLanguage');
    localStorage.removeItem('emergencyActive');
    
    // Clear any other stored user data
    localStorage.removeItem('studentData');
    localStorage.removeItem('teacherData');
    localStorage.removeItem('userData');
    
    // Navigate to login page
    navigate('/login');
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  // Primary navigation items (max 4-5 items)
  const primaryNavItems = [
    {
      label: 'Dashboard',
      path: userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard',
      icon: 'LayoutDashboard',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Emergency',
      path: '/disaster-alerts',
      icon: 'AlertTriangle',
      roles: ['student', 'teacher', 'admin'],
      isEmergency: true
    },
    {
      label: 'Contacts',
      path: '/emergency-contacts',
      icon: 'Phone',
      roles: ['student', 'teacher', 'admin'],
      isEmergency: true
    },
    {
      label: 'Training',
      path: '/virtual-drill-simulation',
      icon: 'Play',
      roles: ['student', 'teacher', 'admin']
    }
  ];

  // Secondary navigation items (overflow menu)
  const secondaryNavItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Help',
      path: '/help',
      icon: 'HelpCircle',
      roles: ['student', 'teacher', 'admin']
    },
    {
      label: 'Admin',
      path: '/admin',
      icon: 'Shield',
      roles: ['admin']
    },
    {
      label: 'Sign Out',
      action: 'logout',
      icon: 'LogOut',
      roles: ['student', 'teacher', 'admin']
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleEmergencyCall = () => {
    // Emergency call functionality
    window.location.href = 'tel:112';
  };

  const handleSecondaryAction = (item) => {
    if (item?.action === 'logout') {
      handleLogout();
    } else {
      handleNavigation(item?.path);
    }
  };

  const filteredPrimaryItems = primaryNavItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const filteredSecondaryItems = secondaryNavItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  return (
    <>
      {/* Emergency Alert Banner */}
      {isEmergencyActive && (
        <div className="emergency-alert animate-slide-down">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} className="animate-emergency-pulse" />
              <span className="font-medium">Emergency Alert Active - Follow safety protocols immediately</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEmergencyCall}
              className="text-error-foreground hover:bg-error-foreground/10"
              iconName="Phone"
              iconSize={16}
            >
              Call 112
            </Button>
          </div>
        </div>
      )}
      {/* Main Header */}
     <header className={`nav-primary ${isEmergencyActive ? 'top-12' : 'top-0'}`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} color="white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-lg font-semibold text-foreground">SafetyPrep Academy</h1>
                    <p className="text-xs text-muted-foreground">NDMA Certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {filteredPrimaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`nav-item touch-target flex items-center space-x-2 ${
                    isActiveRoute(item?.path) ? 'active' : ''
                  } ${item?.isEmergency ? 'text-error hover:text-error' : ''}`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}

              {/* More Menu */}
              {filteredSecondaryItems?.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className="nav-item touch-target flex items-center space-x-2"
                  >
                    <Icon name="MoreHorizontal" size={18} />
                    <span>More</span>
                  </button>

                  {isMoreMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-card-elevated z-200 animate-slide-down">
                      {filteredSecondaryItems?.map((item) => (
                        <button
                          key={item?.path || item?.action}
                          onClick={() => handleSecondaryAction(item)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center space-x-2 first:rounded-t-md last:rounded-b-md ${
                            item?.action === 'logout' ? 'text-destructive hover:text-destructive' : ''
                          }`}
                        >
                          <Icon name={item?.icon} size={16} />
                          <span>{item?.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Emergency Quick Access - Desktop */}
              <Button
                variant="destructive"
                size="sm"
                onClick={handleEmergencyCall}
                className="hidden sm:flex btn-emergency"
                iconName="Phone"
                iconSize={16}
              >
                Emergency
              </Button>

              {/* Desktop Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex text-muted-foreground hover:text-destructive"
                iconName="LogOut"
                iconSize={16}
              >
                Sign Out
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden nav-item touch-target"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-slide-down">
            <div className="px-4 py-2 space-y-1">
              {filteredPrimaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full text-left nav-item touch-target flex items-center space-x-3 ${
                    isActiveRoute(item?.path) ? 'active' : ''
                  } ${item?.isEmergency ? 'text-error hover:text-error' : ''}`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}

              {/* Secondary Items in Mobile */}
              {filteredSecondaryItems?.length > 0 && (
                <>
                  <div className="border-t border-border my-2"></div>
                  {filteredSecondaryItems?.map((item) => (
                    <button
                      key={item?.path || item?.action}
                      onClick={() => handleSecondaryAction(item)}
                      className={`w-full text-left nav-item touch-target flex items-center space-x-3 ${
                        item?.action === 'logout' ? 'text-destructive hover:text-destructive' : ''
                      }`}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </header>
      {/* Emergency Quick Access Button - Mobile */}
      <button
        onClick={handleEmergencyCall}
        className="quick-access-btn sm:hidden touch-target animate-fade-in"
        aria-label="Emergency Call"
      >
        <Icon name="Phone" size={24} />
      </button>
    </>
  );
};

export default Header;