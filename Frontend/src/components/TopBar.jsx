import { useAuth } from '../context/AuthContext';
import './TopBar.css';

export default function TopBar() {
  const { profile } = useAuth();

  return (
    <header className="topbar">
      {/* Mobile Menu Toggle */}
      <button className="topbar-mobile-menu">
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Search */}
      <div className="topbar-search">
        <div className="topbar-search-wrapper">
          <span className="material-symbols-outlined topbar-search-icon">
            search
          </span>
          <input
            className="topbar-search-input"
            placeholder="Search problems..."
            type="text"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="topbar-actions">
        {/* Level Indicator */}
        <div className="topbar-level">
          <span className="topbar-level-text">{profile?.level || 'Rookie'}</span>
          <div className="topbar-level-bar">
            <div className="topbar-level-fill" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button className="topbar-icon-btn">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>

        {/* Notifications */}
        <button className="topbar-icon-btn">
          <span className="material-symbols-outlined">notifications</span>
          <span className="topbar-notification-dot"></span>
        </button>
      </div>
    </header>
  );
}
