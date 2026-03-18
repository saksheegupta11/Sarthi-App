import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requestOTP = async (email: string) => {
    setLoading(true);
    try {
      await api.post('/auth/request-otp', { email });
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Failed to send OTP' };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', { email, otp });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      return { success: true, user: data.user };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Invalid OTP' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate({ to: '/' });
  };

  return {
    token,
    loading,
    isAuthenticated: !!token,
    requestOTP,
    verifyOTP,
    logout,
  };
};