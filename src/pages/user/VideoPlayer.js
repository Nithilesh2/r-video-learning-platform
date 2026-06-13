import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videosAPI } from '../../services/api';
import UserNavbar from '../../components/user/UserNavbar';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    videosAPI.getById(id)
      .then(res => setVideo(res.data.video))
      .catch(() => setError('Video not found'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <UserNavbar />
      <main className="user-main" style={{ maxWidth: 900 }}>
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: 24 }} onClick={() => navigate(-1)}>
          ← Back
        </button>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : video ? (
          <>
            <div className="video-player-wrap" style={{ marginBottom: 28, borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                className="video-iframe"
                src={video.youtubeEmbedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }}
              />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>{video.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span className="badge badge-blue">Video</span>
              <span style={{ fontSize: '.8rem', color: 'var(--text-3)' }}>
                Added {new Date(video.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="card">
              <div className="card-body">
                <h3 style={{ fontSize: '.9rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-2)' }}>DESCRIPTION</h3>
                <p style={{ color: 'var(--text-1)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{video.description}</p>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
};

export default VideoPlayer;
