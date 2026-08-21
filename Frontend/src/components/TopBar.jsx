export default function TopBar() {
  return (
    <header className="flex justify-between items-center w-full px-xl h-16 sticky top-0 z-50 bg-background border-b border-white/10">
      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-primary p-sm">
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md hidden md:flex items-center gap-sm">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full bg-void border border-white/10 rounded-lg pl-xl pr-sm py-xs text-on-surface focus:outline-none focus:border-amber-accent focus:ring-1 focus:ring-amber-accent font-code-md text-code-md transition-colors placeholder-on-surface-variant/50"
            placeholder="Search evidence, cases, logs..."
            type="text"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-md ml-auto">
        {/* Daily Case */}
        <button className="hidden md:flex items-center gap-xs px-sm py-xs border border-amber-accent text-amber-accent rounded-lg font-code-md hover:bg-amber-accent/10 transition-colors">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          Daily Case
        </button>

        {/* Level Indicator */}
        <div className="hidden sm:flex flex-col text-right mr-sm">
          <span className="font-code-sm text-amber-accent">Level 42</span>
          <div className="w-24 h-1 bg-surface-container-high rounded-full mt-1">
            <div className="h-full bg-amber-accent rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>

        {/* Notifications */}
        <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* Account (mobile) */}
        <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 md:hidden">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
