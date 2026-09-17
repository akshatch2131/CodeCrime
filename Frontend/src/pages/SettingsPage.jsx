import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';

export default function SettingsPage() {
  const { profile, user, logout } = useAuth();
  const [name, setName] = useState(profile?.name || '');
  const [saved, setSaved] = useState(false);
  const [fontSize, setFontSize] = useState('14');
  const [autoRun, setAutoRun] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-page">
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 6px 0' }}>
          Settings & Preferences
        </h1>
        <p style={{ color: 'var(--color-on-surface-variant)', margin: 0, fontSize: '15px' }}>
          Manage your developer account preferences and workspace configuration.
        </p>
      </div>

      {/* Profile Info */}
      <div className="settings-section">
        <div className="settings-section-header">
          <h2>Developer Profile</h2>
          <p>Your public identity on CodeCrime and the leaderboard.</p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="settings-form-group">
            <label>Display Name</label>
            <input
              type="text"
              className="settings-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your username"
            />
          </div>

          <div className="settings-form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="settings-input"
              value={user?.email || ''}
              disabled
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button type="submit" className="btn-primary">
              Save Profile
            </button>
            {saved && (
              <span style={{ color: 'var(--color-tertiary)', fontSize: '13px' }}>
                Preferences updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Editor Preferences */}
      <div className="settings-section">
        <div className="settings-section-header">
          <h2>Editor Configuration</h2>
          <p>Customize the Monaco code editor appearance and behavior.</p>
        </div>

        <div className="settings-row-toggle">
          <div className="settings-toggle-info">
            <h4>Editor Font Size</h4>
            <p>Adjust font size in pixels for code editing.</p>
          </div>
          <select
            className="filter-select"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="12">12px</option>
            <option value="14">14px (Default)</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
          </select>
        </div>

        <div className="settings-row-toggle">
          <div className="settings-toggle-info">
            <h4>Auto-format on save</h4>
            <p>Automatically format JavaScript code with standard indentation.</p>
          </div>
          <input
            type="checkbox"
            checked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
            style={{ transform: 'scale(1.2)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Session Management */}
      <div className="settings-section">
        <div className="settings-section-header">
          <h2>Account Security</h2>
          <p>Sign out or manage your authentication session.</p>
        </div>

        <div>
          <button
            type="button"
            className="btn-secondary"
            onClick={logout}
            style={{ color: 'var(--color-error)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              logout
            </span>
            Sign Out of CodeCrime
          </button>
        </div>
      </div>
    </div>
  );
}
