import React, { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import UserFormModal from '../../components/admin/UserFormModal';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState('');
  const { user: currentUser } = useAuth();

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchUsers = useCallback(() => {
    setLoading(true);
    usersAPI.getAll()
      .then(res => setUsers(res.data.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSave = async (form) => {
    if (editUser) {
      await usersAPI.update(editUser._id, form);
      showToast('User updated successfully!');
    } else {
      await usersAPI.create(form);
      showToast('User created successfully!');
    }
    setShowModal(false); setEditUser(null); fetchUsers();
  };

  const handleDelete = async (id) => {
    await usersAPI.delete(id);
    setDeleteConfirm(null); fetchUsers();
    showToast('User deleted.');
  };

  const openAdd = () => { setEditUser(null); setShowModal(true); };
  const openEdit = (u) => { setEditUser(u); setShowModal(true); };

  return (
    <AdminLayout title="User Management">
      {toast && <div className="alert alert-success" style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, minWidth: 260, boxShadow: 'var(--shadow-md)' }}>{toast}</div>}

      <div className="page-header">
        <div><h2>Users</h2><p>{users.length} registered user{users.length !== 1 ? 's' : ''}</p></div>
        <button className="btn btn-primary" onClick={openAdd}>+ Create User</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : users.length === 0 ? (
            <div className="empty-state" style={{ padding: 60 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              <h3>No users yet</h3>
              <p>Create the first user account.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.role === 'admin' ? 'var(--accent)' : 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '.8rem', flexShrink: 0 }}>
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                        {u._id === currentUser?._id && <span className="badge badge-green" style={{ fontSize: '.7rem' }}>You</span>}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-2)' }}>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'badge-purple' : 'badge-blue'}`}>
                        {u.role === 'admin' ? '⭐ Admin' : '👤 User'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-3)' }}>{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <div className="action-btns">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(u)}>Edit</button>
                        {u._id !== currentUser?._id && (
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(u)}>Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <UserFormModal
          user={editUser}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditUser(null); }}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3 className="card-title">Delete User</h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong> ({deleteConfirm.email})? This cannot be undone.</p>
              <div className="confirm-actions">
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm._id)}>Delete User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
