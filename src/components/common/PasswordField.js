import React, { useState } from 'react';

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  autoFocus = false,
  required = false,
  inputClassName = '',
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="form-group password-field-group">
      <label className="form-label">
        {label}{required && ' *'}
      </label>
      <div className="password-input-wrapper">
        <input
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-control ${inputClassName}`}
          autoFocus={autoFocus}
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19.5C7.305 19.5 3.224 16.364 1.5 12c.61-1.3 1.44-2.5 2.46-3.56" />
              <path d="M22.5 12c-.51 1.08-1.2 2.1-2.06 3.03" />
              <path d="M1.5 12C3.224 7.636 7.305 4.5 12 4.5c1.34 0 2.62.27 3.8.75" />
              <path d="M16.24 7.76A6 6 0 0 1 12 6" />
              <path d="M9.88 9.88A3 3 0 0 0 12 15" />
              <path d="M1 1l22 22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 12C3.224 7.636 7.305 4.5 12 4.5s8.776 3.136 10.5 7.5c-1.724 4.364-5.805 7.5-10.5 7.5S3.224 16.364 1.5 12Z" />
              <path d="M12 15a3 3 0 0 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
