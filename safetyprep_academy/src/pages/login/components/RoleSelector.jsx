import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleSelect, selectedLanguage }) => {
  const translations = {
    en: {
      selectRole: 'Select Your Role',
      roleDescription: 'Choose your role to access the appropriate dashboard',
      student: 'Student',
      studentDesc: 'Access learning modules and virtual drills',
      teacher: 'Teacher',
      teacherDesc: 'Manage classes and monitor student progress',
      administrator: 'Administrator',
      adminDesc: 'Institutional oversight and analytics'
    },
    hi: {
      selectRole: 'अपनी भूमिका चुनें',
      roleDescription: 'उपयुक्त डैशबोर्ड तक पहुंचने के लिए अपनी भूमिका चुनें',
      student: 'छात्र',
      studentDesc: 'शिक्षण मॉड्यूल और वर्चुअल ड्रिल तक पहुंच',
      teacher: 'शिक्षक',
      teacherDesc: 'कक्षाओं का प्रबंधन और छात्र प्रगति की निगरानी',
      administrator: 'प्रशासक',
      adminDesc: 'संस्थागत निरीक्षण और विश्लेषण'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const roles = [
    {
      id: 'student',
      name: t?.student,
      description: t?.studentDesc,
      icon: 'GraduationCap',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      id: 'teacher',
      name: t?.teacher,
      description: t?.teacherDesc,
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20'
    },
    {
      id: 'admin',
      name: t?.administrator,
      description: t?.adminDesc,
      icon: 'Shield',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">{t?.selectRole}</h2>
        <p className="text-sm text-muted-foreground">{t?.roleDescription}</p>
      </div>
      <div className="space-y-3">
        {roles?.map((role) => (
          <button
            key={role?.id}
            onClick={() => onRoleSelect(role?.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedRole === role?.id
                ? `${role?.borderColor} ${role?.bgColor} shadow-md`
                : 'border-border bg-card hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${role?.bgColor}`}>
                <Icon 
                  name={role?.icon} 
                  size={24} 
                  className={role?.color}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{role?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{role?.description}</p>
              </div>
              {selectedRole === role?.id && (
                <Icon name="CheckCircle" size={20} className={role?.color} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;