import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="user-navbar">
      <NavLink to="/dashboard" className="navbar-brand">
        <div className="navbar-brand-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
        </div>
        <h2>LearnStream</h2>
      </NavLink>

      <div className="navbar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
        <NavLink to="/videos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Videos</NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Profile</NavLink>
      </div>

      <div className="navbar-right">
        <div style={{ fontSize: '.875rem', color: 'var(--text-2)' }}>Hi, <strong>{user?.name}</strong></div>
        <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
      </div>
    </nav>
  );
};

export default UserNavbar;
