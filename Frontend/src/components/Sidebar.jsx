import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { icon: 'bug_report', label: 'Debugging Problems', to: '/problems' },
  { icon: 'leaderboard', label: 'Leaderboard', to: '/leaderboard' },
  { icon: 'person', label: 'Profile', to: '/profile' },
];

const footerItems = [
  { icon: 'settings', label: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <h1>CodeCrime</h1>
      </div>

      {/* Profile Card */}
      <div className="sidebar-profile">
        <div className="sidebar-profile-avatar">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="sidebar-profile-info">
          <span className="sidebar-profile-name">
            {profile?.name || 'Developer'}
          </span>
          <span className="sidebar-profile-rank">
            {profile?.level || 'Rookie'} • {profile?.xp || 0} XP
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/problems')}
        className="sidebar-cta"
      >
        Start Debugging
      </button>

      {/* Navigation */}
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        {footerItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="sidebar-link"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button onClick={handleLogout} className="sidebar-link">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
