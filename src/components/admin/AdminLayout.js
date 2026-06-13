import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ title, children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <header className="admin-topbar">
          <h1>{title}</h1>
          <span style={{ fontSize: '.8rem', color: 'var(--text-3)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
