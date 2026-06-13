import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { videosAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import UserNavbar from '../../components/user/UserNavbar';

const UserDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    videosAPI.getAll()
      .then(res => setVideos(res.data.videos))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <UserNavbar />
      <main className="user-main">
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Welcome back, {user?.name} 👋</h2>
          <p style={{ color: 'var(--text-2)', marginTop: 6 }}>Continue your learning journey</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : videos.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
            <h3>No videos available yet</h3>
            <p>Check back soon for new content.</p>
          </div>
        ) : (
          <>
            <div className="page-header">
              <div>
                <h2 style={{ fontSize: '1.2rem' }}>Available Videos</h2>
                <p style={{ color: 'var(--text-2)', fontSize: '.875rem' }}>{videos.length} video{videos.length !== 1 ? 's' : ''} available</p>
              </div>
            </div>
            <div className="videos-grid">
              {videos.map(video => (
                <div key={video._id} className="video-card">
                  <img
                    src={video.coverImage}
                    alt={video.title}
                    className="video-thumbnail"
                    onError={e => { e.target.src = `https://picsum.photos/seed/${video._id}/640/360`; }}
                  />
                  <div className="video-card-body">
                    <h3 className="video-card-title">{video.title}</h3>
                    <p className="video-card-desc">{video.description}</p>
                    <div className="video-card-footer">
                      <span className="video-date">{new Date(video.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate(`/video/${video._id}`)}>
                        ▶ Watch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default UserDashboard;
