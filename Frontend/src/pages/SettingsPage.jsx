import { useState } from 'react';

const settingSections = [
  {
    id: 'profile',
    icon: 'person',
    title: 'Profile',
    desc: 'Manage your detective identity and credentials.',
    fields: [
      { label: 'Display Name', value: 'Detective Vane', type: 'text' },
      { label: 'Email', value: 'detective.vane@codecrime.com', type: 'email' },
      { label: 'Badge ID', value: 'DV-0042', type: 'text', disabled: true },
    ],
  },
  {
    id: 'appearance',
    icon: 'palette',
    title: 'Appearance',
    desc: 'Customize the investigation terminal look and feel.',
    toggles: [
      { label: 'Dark Mode', desc: 'Use the nocturne color palette.', enabled: true },
      { label: 'Grid Background', desc: 'Show subtle grid overlay on surfaces.', enabled: true },
      { label: 'Glow Effects', desc: 'Enable hover glow and CTA effects.', enabled: true },
      { label: 'Animations', desc: 'Enable micro-animations and transitions.', enabled: true },
    ],
  },
  {
    id: 'notifications',
    icon: 'notifications',
    title: 'Notifications',
    desc: 'Control how and when you receive case alerts.',
    toggles: [
      { label: 'New Case Alerts', desc: 'Get notified when new cases are filed.', enabled: true },
      { label: 'Daily Case Reminder', desc: 'Receive your daily case assignment at 09:00.', enabled: false },
      { label: 'Rank Promotions', desc: 'Be notified when you rank up.', enabled: true },
      { label: 'Team Activity', desc: 'Updates when team members close cases.', enabled: false },
    ],
  },
  {
    id: 'editor',
    icon: 'code',
    title: 'Editor Preferences',
    desc: 'Configure the code investigation workspace.',
    toggles: [
      { label: 'Line Numbers', desc: 'Show line numbers in the code viewer.', enabled: true },
      { label: 'Word Wrap', desc: 'Wrap long lines instead of horizontal scroll.', enabled: false },
      { label: 'Minimap', desc: 'Show code minimap in the editor sidebar.', enabled: true },
      { label: 'Bracket Matching', desc: 'Highlight matching brackets and parentheses.', enabled: true },
    ],
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [toggleStates, setToggleStates] = useState(() => {
    const state = {};
    settingSections.forEach((section) => {
      if (section.toggles) {
        section.toggles.forEach((t, i) => {
          state[`${section.id}-${i}`] = t.enabled;
        });
      }
    });
    return state;
  });

  const handleToggle = (key) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentSection = settingSections.find((s) => s.id === activeSection);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-lg">
        <h1 className="font-headline-lg text-on-surface mb-xs">Settings</h1>
        <p className="text-on-surface-variant font-code-md">
          Configure your investigation environment and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-grid-gutter">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="flex lg:flex-col gap-xs overflow-x-auto lg:overflow-visible pb-xs lg:pb-0">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-sm px-sm py-xs rounded-lg transition-all duration-200 whitespace-nowrap text-left ${
                  activeSection === section.id
                    ? 'text-primary font-bold bg-secondary-container/20'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{section.icon}</span>
                <span className="font-body-md">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-3">
          <div className="investigation-layer rounded-xl p-lg">
            <div className="flex items-center gap-sm mb-md border-b border-white/5 pb-md">
              <span className="material-symbols-outlined text-primary">{currentSection.icon}</span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{currentSection.title}</h2>
                <p className="font-code-sm text-code-sm text-on-surface-variant">{currentSection.desc}</p>
              </div>
            </div>

            {/* Fields */}
            {currentSection.fields && (
              <div className="space-y-md">
                {currentSection.fields.map((field) => (
                  <div key={field.label}>
                    <label className="block font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider mb-xs">
                      {field.label}
                    </label>
                    <input
                      className={`w-full bg-void border border-white/10 rounded-lg py-sm px-md font-body-md text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-colors ${
                        field.disabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      type={field.type}
                      defaultValue={field.value}
                      disabled={field.disabled}
                    />
                  </div>
                ))}
                <div className="pt-md">
                  <button className="bg-primary-container text-void font-headline-md font-bold py-sm px-lg rounded-lg hover:bg-primary transition-colors" style={{ fontSize: '14px', lineHeight: '20px' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Toggles */}
            {currentSection.toggles && (
              <div className="space-y-sm">
                {currentSection.toggles.map((toggle, i) => {
                  const key = `${currentSection.id}-${i}`;
                  const isOn = toggleStates[key];
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-variant/20 transition-colors cursor-pointer group"
                      onClick={() => handleToggle(key)}
                    >
                      <div>
                        <div className="font-body-md text-on-surface group-hover:text-primary transition-colors">{toggle.label}</div>
                        <div className="font-code-sm text-code-sm text-on-surface-variant/60">{toggle.desc}</div>
                      </div>
                      <div
                        className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors duration-200 shrink-0 ml-md ${
                          isOn ? 'bg-primary-container' : 'bg-surface-variant'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-void shadow transition-transform duration-200 ${
                            isOn ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Danger Zone */}
          {activeSection === 'profile' && (
            <div className="investigation-layer rounded-xl p-lg mt-grid-gutter border-error/20">
              <div className="flex items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-error">warning</span>
                <h3 className="font-headline-sm text-error">Danger Zone</h3>
              </div>
              <p className="font-body-md text-on-surface-variant mb-md">
                Permanently delete your detective profile and all associated case history. This action cannot be undone.
              </p>
              <button className="border border-error/30 text-error font-code-md px-md py-xs rounded-lg hover:bg-error/10 transition-colors">
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
