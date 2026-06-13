import React, { useState, useEffect } from 'react';
import PasswordField from '../common/PasswordField';

const defaultForm = { name: '', email: '', password: '', role: 'user' };

const UserFormModal = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, password: '', role: user.role });
    else setForm(defaultForm);
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError('Name and email are required'); return; }
    if (!user && !form.password) { setError('Password is required for new users'); return; }
    if (form.password && form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    try {
      const data = { ...form };
      if (!data.password) delete data.password;
      await onSave(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="card-title">{user ? 'Edit User' : 'Create User'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" name="name" className="form-control" placeholder="e.g. Priya Sharma" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" name="email" className="form-control" placeholder="user@example.com" value={form.email} onChange={handleChange} />
            </div>
            <PasswordField
              label={`Password ${user ? '(leave blank to keep current)' : '*'}`}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={user ? 'Leave blank to keep unchanged' : 'Min. 6 characters'}
            />
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Role *</label>
              <select name="role" className="form-control" value={form.role} onChange={handleChange}>
                <option value="user">User (Student)</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (user ? 'Save Changes' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
