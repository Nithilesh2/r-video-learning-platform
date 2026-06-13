import React, { useState, useEffect, useCallback } from 'react';
import { videosAPI } from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import VideoFormModal from '../../components/admin/VideoFormModal';

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchVideos = useCallback(() => {
    setLoading(true);
    videosAPI.getAll()
      .then(res => setVideos(res.data.videos || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  const handleSave = async (form) => {
    if (editVideo) {
      await videosAPI.update(editVideo._id, form);
      showToast('Video updated successfully!');
    } else {
      await videosAPI.create(form);
      showToast('Video added successfully!');
    }
    setShowModal(false); setEditVideo(null); fetchVideos();
  };

  const handleDelete = async (id) => {
    await videosAPI.delete(id);
    setDeleteConfirm(null); fetchVideos();
    showToast('Video deleted.');
  };

  const openAdd = () => { setEditVideo(null); setShowModal(true); };
  const openEdit = (v) => { setEditVideo(v); setShowModal(true); };

  return (
    <AdminLayout title="Video Management">
      {toast && <div className="alert alert-success" style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, minWidth: 260, boxShadow: 'var(--shadow-md)' }}>{toast}</div>}

      <div className="page-header">
        <div><h2>Videos</h2><p>{videos.length} video{videos.length !== 1 ? 's' : ''} total</p></div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Video</button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
        ) : videos.length === 0 ? (
          <div className="empty-state" style={{ padding: 60 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
            <h3>No videos yet</h3>
            <p>Add your first video to get started.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openAdd}>+ Add First Video</button>
          </div>
        ) : (
          videos.map(video => (
            <div key={video._id} className="admin-video-item">
              <img src={video.coverImage} alt={video.title} className="admin-video-thumb"
                onError={e => { e.target.src = `https://picsum.photos/seed/${video._id}/200/120`; }} />
              <div className="admin-video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
              </div>
              <span className="admin-video-date">
                {new Date(video.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <div className="action-btns">
                <button className="btn btn-secondary btn-sm" onClick={() => openEdit(video)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(video)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <VideoFormModal
          video={editVideo}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditVideo(null); }}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3 className="card-title">Delete Video</h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? This cannot be undone.</p>
              <div className="confirm-actions">
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm._id)}>Delete Video</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVideos;
