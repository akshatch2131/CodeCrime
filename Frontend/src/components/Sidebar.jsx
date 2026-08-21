import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { icon: 'folder_open', label: 'Active Cases', to: '/cases' },
  { icon: 'inventory_2', label: 'Evidence Locker', to: '/evidence' },
  { icon: 'archive', label: 'Cold Cases', to: '/cold-cases' },
  { icon: 'groups', label: 'Personnel', to: '/personnel' },
];

const footerItems = [
  { icon: 'settings', label: 'Settings', to: '/settings' },
  { icon: 'logout', label: 'Logout', to: '/login' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-surface-container-low border-r border-white/10 flex flex-col h-screen p-md gap-sm w-64 flex-shrink-0 z-10 hidden md:flex">
      {/* Brand */}
      <div className="mb-sm">
        <h1 className="font-label-caps text-label-caps text-primary uppercase">CodeCrime</h1>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-sm mb-lg p-sm rounded-lg glass-panel-solid">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-surface-variant flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant">person</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-headline-sm text-primary truncate" style={{ fontSize: '16px', lineHeight: '20px' }}>
            Detective Vane
          </span>
          <span className="font-code-sm text-code-sm text-amber-accent truncate">
            Senior P.I. • 2,450 XP
          </span>
        </div>
      </div>

      {/* New Investigation CTA */}
      <button
        onClick={() => navigate('/cases')}
        className="bg-amber-accent text-void font-headline-md uppercase font-bold py-sm px-md rounded-lg mb-sm hover:bg-primary transition-colors w-full"
        style={{ fontSize: '14px', lineHeight: '20px' }}
      >
        New Investigation
      </button>

      {/* Navigation Tabs */}
      <div className="flex flex-col gap-xs flex-grow overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-sm p-sm rounded-lg transition-all duration-200 active:translate-x-1 ${
                isActive
                  ? 'text-primary font-bold bg-secondary-container/20'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer Tabs */}
      <div className="flex flex-col gap-xs mt-auto pt-sm border-t border-white/10">
        {footerItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center gap-sm p-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all duration-200 rounded-lg active:translate-x-1"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
