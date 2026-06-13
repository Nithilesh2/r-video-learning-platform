import React from 'react';
import { useAuth } from '../../context/AuthContext';
import UserNavbar from '../../components/user/UserNavbar';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <UserNavbar />
      <main className="user-main" style={{ maxWidth: 600 }}>
        <div className="page-header">
          <div><h2>My Profile</h2><p>Your account information</p></div>
        </div>
        <div className="card">
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 48 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name}</h2>
            <p style={{ color: 'var(--text-2)', margin: '4px 0 16px' }}>{user?.email}</p>
            <span className="badge badge-blue" style={{ marginBottom: 32 }}>
              {user?.role === 'admin' ? '⭐ Admin' : '👤 Student'}
            </span>
            <div style={{ width: '100%', background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', padding: '16px 20px', textAlign: 'left', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '.875rem', color: 'var(--text-2)' }}>Member since</span>
                <span style={{ fontSize: '.875rem', fontWeight: 600 }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontSize: '.875rem', color: 'var(--text-2)' }}>Account type</span>
                <span style={{ fontSize: '.875rem', fontWeight: 600, textTransform: 'capitalize' }}>{user?.role}</span>
              </div>
            </div>
            <button onClick={logout} className="btn btn-danger" style={{ width: '100%', justifyContent: 'center' }}>Sign Out</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
