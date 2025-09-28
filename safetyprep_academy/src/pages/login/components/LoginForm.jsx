import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ selectedLanguage, onLanguageChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    institutionCode: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    student: { email: 'student@safetyprep.edu', password: 'Student@123', role: 'student' },
    teacher: { email: 'teacher@safetyprep.edu', password: 'Teacher@456', role: 'teacher' },
    admin: { email: 'admin@safetyprep.edu', password: 'Admin@789', role: 'admin' }
  };

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your SafetyPrep Academy account',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      institutionLabel: 'Institution Code',
      institutionPlaceholder: 'Enter institution code',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password?',
      invalidCredentials: 'Invalid email or password. Please try again.',
      networkError: 'Network error. Please check your connection.',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address'
    },
    hi: {
      title: 'वापस स्वागत है',
      subtitle: 'अपने SafetyPrep Academy खाते में साइन इन करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      institutionLabel: 'संस्थान कोड',
      institutionPlaceholder: 'संस्थान कोड दर्ज करें',
      rememberMe: 'मुझे याद रखें',
      signIn: 'साइन इन करें',
      forgotPassword: 'पासवर्ड भूल गए?',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।',
      networkError: 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।',
      requiredField: 'यह फील्ड आवश्यक है',
      invalidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें'
    }
  };

  const t = translations?.[selectedLanguage] || translations?.en;

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = t?.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.invalidEmail;
    }

    if (!formData?.password?.trim()) {
      newErrors.password = t?.requiredField;
    }

    if (!formData?.institutionCode?.trim()) {
      newErrors.institutionCode = t?.requiredField;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const user = Object.values(mockCredentials)?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        // Store user session
        localStorage.setItem('userRole', user?.role);
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('institutionCode', formData?.institutionCode);
        localStorage.setItem('currentLanguage', selectedLanguage);
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberLogin', 'true');
        }

        // Navigate based on role
        switch (user?.role) {
          case 'student': navigate('/student-dashboard');
            break;
          case 'teacher': navigate('/teacher-dashboard');
            break;
          case 'admin': navigate('/teacher-dashboard'); // Admin uses teacher dashboard for now
            break;
          default:
            navigate('/student-dashboard');
        }
      } else {
        setErrors({ general: t?.invalidCredentials });
      }
    } catch (error) {
      setErrors({ general: t?.networkError });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t?.title}</h1>
        <p className="text-muted-foreground">{t?.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
            <p className="text-error text-sm">{errors?.general}</p>
          </div>
        )}

        <Input
          label={t?.emailLabel}
          type="email"
          placeholder={t?.emailPlaceholder}
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          className="w-full"
        />

        <div className="relative">
          <Input
            label={t?.passwordLabel}
            type={showPassword ? 'text' : 'password'}
            placeholder={t?.passwordPlaceholder}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <Input
          label={t?.institutionLabel}
          type="text"
          placeholder={t?.institutionPlaceholder}
          value={formData?.institutionCode}
          onChange={(e) => handleInputChange('institutionCode', e?.target?.value)}
          error={errors?.institutionCode}
          required
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label={t?.rememberMe}
            checked={formData?.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {t?.forgotPassword}
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          iconSize={20}
        >
          {t?.signIn}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;