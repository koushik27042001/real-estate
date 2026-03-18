import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../services/api';
import { getRouteRole } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const user = JSON.parse(userData);
      const normalizedRole = getRouteRole(user.role);
      user.role = normalizedRole;
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, redirectTo = null) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      const normalizedRole = getRouteRole(data.user.role);
      data.user.role = normalizedRole;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate(redirectTo || `/dashboard/${data.user.role}`);
    } else {
      const errMsg = data.message || (data.errors?.[0]?.msg) || 'Login failed';
      throw new Error(errMsg);
    }
  };

  const register = async (name, email, password, role = 'buyer', redirectTo = null) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json();
    if (response.ok) {
      const normalizedRole = getRouteRole(data.user?.role || role);
      if (data.user) data.user.role = normalizedRole;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate(redirectTo || `/dashboard/${normalizedRole}`);
    } else {
      const errMsg = data.message || (data.errors?.[0]?.msg) || 'Registration failed';
      throw new Error(errMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};