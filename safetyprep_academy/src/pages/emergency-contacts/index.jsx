import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import QuickEmergencyAccess from '../../components/ui/QuickEmergencyAccess';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import ContactCategory from './components/ContactCategory';
import QuickDialPad from './components/QuickDialPad';
import OfflineIndicator from './components/OfflineIndicator';
import LocationShareModal from './components/LocationShareModal';

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [locationShareModal, setLocationShareModal] = useState({ isOpen: false, contact: null });
  const [userRole] = useState('student');

  // Mock emergency contacts data
  const emergencyContacts = {
    'Emergency Services': [
      {
        id: 'emergency-112',
        name: 'National Emergency Services',
        role: 'Emergency Response',
        primaryPhone: '112',
        status: 'available',
        icon: 'Phone',
        isPriority: true,
        shortName: '112',
        alternateNumbers: [
          { label: 'Fire', number: '101' },
          { label: 'Police', number: '100' },
          { label: 'Medical', number: '108' }
        ]
      },
      {
        id: 'fire-101',
        name: 'Fire Department',
        role: 'Fire Emergency Response',
        primaryPhone: '101',
        status: 'available',
        icon: 'Flame',
        isPriority: true,
        shortName: 'Fire',
        department: 'Delhi Fire Services'
      },
      {
        id: 'police-100',
        name: 'Police Control Room',
        role: 'Law Enforcement',
        primaryPhone: '100',
        status: 'available',
        icon: 'ShieldCheck',
        isPriority: true,
        shortName: 'Police',
        department: 'Delhi Police'
      },
      {
        id: 'medical-108',
        name: 'Medical Emergency',
        role: 'Ambulance Services',
        primaryPhone: '108',
        status: 'available',
        icon: 'Heart',
        isPriority: true,
        shortName: 'Medical',
        department: 'National Health Mission'
      }
    ],
    'School Administration': [
      {
        id: 'principal',
        name: 'Dr. Rajesh Kumar',
        role: 'Principal',
        primaryPhone: '+91-9876543210',
        status: 'available',
        icon: 'User',
        department: 'Administration',
        email: 'principal@safetyprep.edu.in',
        whatsapp: '+91-9876543210',
        alternateNumbers: [
          { label: 'Office', number: '+91-11-26543210' },
          { label: 'Home', number: '+91-11-26543211' }
        ]
      },
      {
        id: 'safety-officer',
        name: 'Mrs. Priya Sharma',
        role: 'Safety Officer',
        primaryPhone: '+91-9876543211',
        status: 'available',
        icon: 'Shield',
        department: 'Safety & Security',
        email: 'safety@safetyprep.edu.in',
        whatsapp: '+91-9876543211'
      },
      {
        id: 'admin-head',
        name: 'Mr. Amit Verma',
        role: 'Administrative Head',
        primaryPhone: '+91-9876543212',
        status: 'busy',
        icon: 'Briefcase',
        department: 'Administration',
        email: 'admin@safetyprep.edu.in'
      }
    ],
    'Disaster Management': [
      {
        id: 'ndma',
        name: 'NDMA Control Room',
        role: 'National Disaster Management',
        primaryPhone: '+91-11-26701700',
        status: 'available',
        icon: 'AlertTriangle',
        isPriority: true,
        shortName: 'NDMA',
        department: 'National Disaster Management Authority',
        email: 'control@ndma.gov.in',
        alternateNumbers: [
          { label: 'Helpline', number: '1078' },
          { label: 'Emergency', number: '+91-11-26701728' }
        ]
      },
      {
        id: 'ddma',
        name: 'Delhi Disaster Management',
        role: 'District Disaster Management',
        primaryPhone: '+91-11-23392958',
        status: 'available',
        icon: 'MapPin',
        department: 'Delhi Disaster Management Authority',
        email: 'ddma@delhi.gov.in'
      },
      {
        id: 'imd',
        name: 'IMD Weather Center',
        role: 'Weather Monitoring',
        primaryPhone: '+91-11-24629798',
        status: 'available',
        icon: 'Cloud',
        department: 'India Meteorological Department',
        email: 'weather@imd.gov.in'
      }
    ],
    'Personal Contacts': [
      {
        id: 'parent-1',
        name: 'Rajesh Gupta (Father)',
        role: 'Parent/Guardian',
        primaryPhone: '+91-9876543213',
        status: 'available',
        icon: 'User',
        email: 'rajesh.gupta@email.com',
        whatsapp: '+91-9876543213',
        alternateNumbers: [
          { label: 'Office', number: '+91-11-26543213' }
        ]
      },
      {
        id: 'parent-2',
        name: 'Sunita Gupta (Mother)',
        role: 'Parent/Guardian',
        primaryPhone: '+91-9876543214',
        status: 'available',
        icon: 'User',
        email: 'sunita.gupta@email.com',
        whatsapp: '+91-9876543214'
      },
      {
        id: 'guardian',
        name: 'Dr. Vikram Singh (Uncle)',
        role: 'Emergency Guardian',
        primaryPhone: '+91-9876543215',
        status: 'available',
        icon: 'UserCheck',
        email: 'vikram.singh@email.com',
        whatsapp: '+91-9876543215'
      }
    ]
  };

  // Get priority contacts for quick dial
  const priorityContacts = Object.values(emergencyContacts)?.flat()?.filter(contact => contact?.isPriority);

  // Filter contacts based on search
  const filteredContacts = Object.entries(emergencyContacts)?.reduce((acc, [category, contacts]) => {
    const filtered = contacts?.filter(contact =>
      contact?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      contact?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      contact?.primaryPhone?.includes(searchQuery) ||
      (contact?.department && contact?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
    );
    if (filtered?.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setLastSyncTime(new Date());
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle emergency call
  const handleCall = (contact, number) => {
    // Log the emergency call
    console.log(`Emergency call initiated to ${contact?.name} at ${number}`);
    
    // Track emergency action
    const callData = {
      contactId: contact?.id,
      contactName: contact?.name,
      number: number,
      timestamp: new Date()?.toISOString(),
      userRole: userRole,
      action: 'call'
    };
    
    // Store in localStorage for offline access
    const emergencyLogs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
    emergencyLogs?.push(callData);
    localStorage.setItem('emergencyLogs', JSON.stringify(emergencyLogs));
    
    // Initiate call
    window.location.href = `tel:${number}`;
  };

  // Handle emergency message
  const handleMessage = (contact, number) => {
    const timestamp = new Date()?.toLocaleString();
    const message = `Emergency message from SafetyPrep Academy\n\nTime: ${timestamp}\nUser: ${userRole}\nContact: ${contact?.name}\n\nThis is an emergency communication. Please respond immediately.`;
    
    // Log the emergency message
    console.log(`Emergency message sent to ${contact?.name} at ${number}`);
    
    window.location.href = `sms:${number}?body=${encodeURIComponent(message)}`;
  };

  // Handle location sharing
  const handleLocationShare = (contact) => {
    setLocationShareModal({ isOpen: true, contact });
  };

  const handleLocationShareComplete = (contact, locationData, method) => {
    console.log(`Location shared with ${contact?.name} via ${method}`, locationData);
    
    // Log location share
    const shareData = {
      contactId: contact?.id,
      contactName: contact?.name,
      method: method,
      locationData: locationData,
      timestamp: new Date()?.toISOString(),
      userRole: userRole,
      action: 'location_share'
    };
    
    const emergencyLogs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
    emergencyLogs?.push(shareData);
    localStorage.setItem('emergencyLogs', JSON.stringify(emergencyLogs));
  };

  // Handle emergency alert dismissal
  const handleAlertDismiss = () => {
    setIsEmergencyActive(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Alert Banner */}
      <EmergencyAlertBanner
        isActive={isEmergencyActive}
        alertType="general"
        message="Emergency drill in progress - Practice emergency contact procedures"
        onDismiss={handleAlertDismiss}
        autoHide={false}
      />
      {/* Header */}
      <Header 
        userRole={userRole} 
        isEmergencyActive={isEmergencyActive}
      />
      {/* Offline Indicator */}
      <OfflineIndicator 
        isOffline={isOffline}
        lastSyncTime={lastSyncTime}
      />
      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isEmergencyActive ? 'pt-20' : ''}`}>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-error rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={24} className="text-error-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Emergency Contacts</h1>
                <p className="text-muted-foreground">
                  Immediate access to critical emergency communication channels
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="destructive"
                onClick={() => setIsEmergencyActive(!isEmergencyActive)}
                iconName="AlertTriangle"
                iconPosition="left"
                iconSize={16}
              >
                {isEmergencyActive ? 'End Emergency' : 'Test Emergency'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/disaster-alerts')}
                iconName="Bell"
                iconPosition="left"
                iconSize={16}
              >
                View Alerts
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Dial Section */}
        <QuickDialPad
          priorityContacts={priorityContacts}
          onCall={handleCall}
          onMessage={handleMessage}
          className="mb-8"
        />

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                type="search"
                placeholder="Search contacts by name, role, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                iconName="Search"
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी</option>
                <option value="tamil">தமிழ்</option>
                <option value="bengali">বাংলা</option>
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Instructions */}
        <div className="mb-8 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning mb-2">Emergency Contact Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
                <div>
                  <h4 className="font-medium mb-1">During Real Emergencies:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Call 112 for immediate emergency response</li>
                    <li>• Stay calm and provide clear information</li>
                    <li>• Share your exact location</li>
                    <li>• Follow dispatcher instructions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">During Drills:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Practice using emergency contacts</li>
                    <li>• Test location sharing features</li>
                    <li>• Verify contact information accuracy</li>
                    <li>• Report any issues to safety officer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Categories */}
        <div className="space-y-8">
          {Object.entries(filteredContacts)?.map(([category, contacts]) => (
            <ContactCategory
              key={category}
              category={category}
              contacts={contacts}
              onCall={handleCall}
              onMessage={handleMessage}
              onLocationShare={handleLocationShare}
              defaultExpanded={category === 'Emergency Services'}
            />
          ))}
        </div>

        {/* No Results */}
        {Object.keys(filteredContacts)?.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No contacts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse all categories
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Emergency Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Phone" size={24} className="text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">24/7 Available</h3>
            <p className="text-sm text-muted-foreground">All emergency services are operational round the clock</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="MapPin" size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Location Sharing</h3>
            <p className="text-sm text-muted-foreground">Instant location sharing with emergency contacts</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" size={24} className="text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">NDMA Certified</h3>
            <p className="text-sm text-muted-foreground">Verified emergency contact database</p>
          </div>
        </div>
      </main>
      {/* Location Share Modal */}
      <LocationShareModal
        isOpen={locationShareModal?.isOpen}
        onClose={() => setLocationShareModal({ isOpen: false, contact: null })}
        contact={locationShareModal?.contact}
        onLocationShare={handleLocationShareComplete}
      />
      {/* Quick Emergency Access */}
      <QuickEmergencyAccess
        position="bottom-right"
        userRole={userRole}
        isEmergencyActive={isEmergencyActive}
      />
    </div>
  );
};

export default EmergencyContacts;