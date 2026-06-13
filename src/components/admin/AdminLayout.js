import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      <Sidebar isMobileOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin menu"
            >
              <span />
              <span />
              <span />
            </button>
            <div>
              <h1>{title}</h1>
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
      <div className={`drawer-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar} />
    </div>
  );
};

export default AdminLayout;
