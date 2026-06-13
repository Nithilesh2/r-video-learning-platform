import React, { useState, useEffect } from 'react';

const defaultForm = { title: '', description: '', coverImage: '', youtubeEmbedUrl: '' };

const VideoFormModal = ({ video, onSave, onClose }) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (video) setForm({ title: video.title, description: video.description, coverImage: video.coverImage, youtubeEmbedUrl: video.youtubeEmbedUrl });
    else setForm(defaultForm);
  }, [video]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.coverImage || !form.youtubeEmbedUrl) {
      setError('All fields are required'); return;
    }
    if (!form.youtubeEmbedUrl.startsWith('https://www.youtube.com/embed/')) {
      setError('YouTube URL must be in format: https://www.youtube.com/embed/VIDEO_ID'); return;
    }
    setLoading(true); setError('');
    try {
      await onSave(form);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="card-title">{video ? 'Edit Video' : 'Add New Video'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label className="form-label">Video Title *</label>
              <input type="text" name="title" className="form-control" placeholder="e.g. Introduction to React Hooks" value={form.title} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea name="description" className="form-control" rows={3} placeholder="Brief description of what this video covers..." value={form.description} onChange={handleChange} style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Cover Image URL *</label>
              <input type="url" name="coverImage" className="form-control" placeholder="https://example.com/image.jpg" value={form.coverImage} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">YouTube Embed URL *</label>
              <input type="url" name="youtubeEmbedUrl" className="form-control" placeholder="https://www.youtube.com/embed/VIDEO_ID" value={form.youtubeEmbedUrl} onChange={handleChange} />
              <p className="form-error" style={{ color: 'var(--text-3)', marginTop: 4 }}>Format: https://www.youtube.com/embed/VIDEO_ID</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (video ? 'Save Changes' : 'Add Video')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoFormModal;
