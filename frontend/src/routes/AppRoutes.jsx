import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Home from '../pages/Home';
import Properties from '../pages/Properties';
import PropertyDetails from '../pages/PropertyDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BuyerDashboard from '../pages/BuyerDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import TenantDashboard from '../pages/TenantDashboard';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/buyer" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/seller" element={<ProtectedRoute allowedRoles={['seller']}><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/agent" element={<ProtectedRoute allowedRoles={['agent']}><TenantDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;