import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute, PublicRoute } from './components/common/ProtectedRoute';

// User Pages
import UserLogin from './pages/user/Login';
import UserDashboard from './pages/user/Dashboard';
import Videos from './pages/user/Videos';
import VideoPlayer from './pages/user/VideoPlayer';
import Profile from './pages/user/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVideos from './pages/admin/AdminVideos';
import AdminUsers from './pages/admin/AdminUsers';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public / User Login */}
          <Route path="/" element={<PublicRoute><UserLogin /></PublicRoute>} />

          {/* Admin Login */}
          <Route path="/admin-example" element={<PublicRoute><AdminLogin /></PublicRoute>} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
          <Route path="/video/:id" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/admin-example/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin-example/videos" element={<AdminRoute><AdminVideos /></AdminRoute>} />
          <Route path="/admin-example/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
