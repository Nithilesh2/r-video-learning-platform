import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const closeMenu = () => setMenuOpen(false);

  const links = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Videos', to: '/videos' },
    { label: 'Profile', to: '/profile' },
  ];

  return (
    <>
      <nav className="user-navbar">
        <div className="navbar-left">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open mobile navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <NavLink to="/dashboard" className="navbar-brand" onClick={closeMenu}>
            <div className="navbar-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            </div>
            <h2>LearnStream</h2>
          </NavLink>
        </div>

        <div className="navbar-nav desktop-only">
          {links.map((link) => (
            <NavLink key={link.label} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-right desktop-only">
          <div style={{ fontSize: '.875rem', color: 'var(--text-2)' }}>Hi, <strong>{user?.name}</strong></div>
          <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
        </div>
      </nav>

      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div>
            <p>Navigation</p>
            <span>{user?.name ? `Hello, ${user.name}` : 'Welcome back'}</span>
          </div>
          <button type="button" className="modal-close" onClick={closeMenu} aria-label="Close navigation">✕</button>
        </div>
        <nav className="mobile-nav-list">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <button type="button" className="mobile-nav-link mobile-nav-link-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
      <div className={`drawer-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu} />
    </>
  );
};

export default UserNavbar;
