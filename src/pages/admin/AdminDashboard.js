import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { videosAPI, usersAPI } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ videos: 0, users: 0 });
  const [recentVideos, setRecentVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([videosAPI.getAll(), usersAPI.getAll()])
      .then(([vRes, uRes]) => {
        setStats({ videos: vRes.data.count, users: uRes.data.count });
        setRecentVideos(vRes.data.videos.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLayout title="Dashboard"><div className="loading-screen" style={{ minHeight: 300 }}><div className="spinner" /></div></AdminLayout>;

  return (
    <AdminLayout title="Dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
          </div>
          <div className="stat-info">
            <p>Total Videos</p>
            <h3>{stats.videos}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ede9fe' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="stat-info">
            <p>Total Users</p>
            <h3>{stats.users}</h3>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 className="card-title">Recent Videos</h3>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin-example/videos')}>View All →</button>
        </div>
        {recentVideos.length === 0 ? (
          <div className="empty-state" style={{ padding: 40 }}>
            <h3>No videos yet</h3>
            <p>Add your first video to get started.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/admin-example/videos')}>+ Add Video</button>
          </div>
        ) : (
          <div>
            {recentVideos.map(video => (
              <div key={video._id} className="admin-video-item">
                <img src={video.coverImage} alt={video.title} className="admin-video-thumb"
                  onError={e => { e.target.src = `https://picsum.photos/seed/${video._id}/200/120`; }} />
                <div className="admin-video-info">
                  <h4>{video.title}</h4>
                  <p>{video.description}</p>
                </div>
                <span className="admin-video-date">
                  {new Date(video.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
