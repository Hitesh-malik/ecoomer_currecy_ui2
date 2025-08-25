import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AuthForm = ({ mode, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    rememberMe: false,
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      // Name validation
      if (!formData?.name?.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData?.name?.trim()?.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      // Phone validation
      if (!formData?.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s\-()]{10,15}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }

      // Password confirmation
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Terms acceptance
      if (!formData?.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ 
        submit: error?.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  const forgotPasswordClick = () => {
    // Handle forgot password - could navigate to forgot password page or show modal
    console.log('Forgot password clicked');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Register Fields */}
      {mode === 'register' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            error={errors?.name}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </motion.div>
      )}
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        placeholder="Enter your email"
        required
        disabled={isLoading}
      />
      {/* Phone Field - Register only */}
      {mode === 'register' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            placeholder="Enter your phone number"
            required
            disabled={isLoading}
          />
        </motion.div>
      )}
      {/* Password Field */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>
      {/* Confirm Password - Register only */}
      {mode === 'register' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative"
        >
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </motion.div>
      )}
      {/* Referral Code - Register only */}
      {mode === 'register' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Input
            label="Referral Code (Optional)"
            type="text"
            name="referralCode"
            value={formData?.referralCode}
            onChange={handleInputChange}
            error={errors?.referralCode}
            placeholder="Enter referral code"
            disabled={isLoading}
            description="Get extra credits when you use a referral code"
          />
        </motion.div>
      )}
      {/* Login Options */}
      {mode === 'login' && (
        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            label="Remember me"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={forgotPasswordClick}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
      )}
      {/* Terms Acceptance - Register only */}
      {mode === 'register' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formData?.acceptTerms}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            error={errors?.acceptTerms}
            label={
              <span className="text-sm">
                I agree to the{' '}
                <a href="/terms" className="text-primary hover:text-primary/80">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </a>
              </span>
            }
          />
        </motion.div>
      )}
      {/* Submit Error */}
      {errors?.submit && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <p className="text-sm text-destructive">{errors?.submit}</p>
          </div>
        </motion.div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
      {/* Register Bonus Highlight */}
      {mode === 'register' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-3 bg-success/10 border border-success/20 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Coins" size={16} className="text-success" />
            <p className="text-sm text-success font-medium">
              Get ₹25 welcome bonus on successful registration!
            </p>
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default AuthForm;