import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin-example'); };

  const links = [
    {
      label: 'Dashboard', path: '/admin-example/dashboard',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    },
    {
      label: 'Videos', path: '/admin-example/videos',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
    },
    {
      label: 'Users', path: '/admin-example/users',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>⚡ LearnStream</h2>
        <p>Admin Control Panel</p>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">Main Menu</div>
        {links.map(link => (
          <NavLink key={link.path} to={link.path} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="sidebar-user-info" style={{ flex: 1, minWidth: 0 }}>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
            <span>Administrator</span>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-danger btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
