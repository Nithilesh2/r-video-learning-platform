import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { videosAPI } from '../../services/api';
import UserNavbar from '../../components/user/UserNavbar';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    videosAPI.getAll()
      .then(res => setVideos(res.data.videos))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <UserNavbar />
      <main className="user-main">
        <div className="page-header">
          <div><h2>All Videos</h2><p>Browse all available course recordings</p></div>
          <input
            type="search" className="form-control" style={{ width: 280 }}
            placeholder="Search videos..." value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <h3>{search ? 'No videos match your search' : 'No videos available'}</h3>
            <p>{search ? 'Try a different keyword' : 'Check back later for new content.'}</p>
          </div>
        ) : (
          <div className="videos-grid">
            {filtered.map(video => (
              <div key={video._id} className="video-card">
                <img
                  src={video.coverImage} alt={video.title} className="video-thumbnail"
                  onError={e => { e.target.src = `https://picsum.photos/seed/${video._id}/640/360`; }}
                />
                <div className="video-card-body">
                  <h3 className="video-card-title">{video.title}</h3>
                  <p className="video-card-desc">{video.description}</p>
                  <div className="video-card-footer">
                    <span className="video-date">{new Date(video.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate(`/video/${video._id}`)}>▶ Watch</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Videos;
