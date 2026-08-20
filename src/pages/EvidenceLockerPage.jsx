import { Link } from 'react-router-dom';

const evidenceItems = [
  {
    id: 'EV-001',
    type: 'Source Code',
    icon: 'code',
    caseRef: 'Case #902-A',
    label: 'orderService.js',
    desc: 'Transaction processing module with suspected duplicate insertion vulnerability.',
    status: 'Analyzed',
    statusColor: 'tertiary',
    date: '2026-08-18',
  },
  {
    id: 'EV-002',
    type: 'Server Logs',
    icon: 'terminal',
    caseRef: 'Case #902-A',
    label: 'app-server.log',
    desc: 'Production server logs showing deadlock stack traces between 03:00–03:45 UTC.',
    status: 'Under Review',
    statusColor: 'amber-accent',
    date: '2026-08-17',
  },
  {
    id: 'EV-003',
    type: 'Database Dump',
    icon: 'database',
    caseRef: 'Case #884-D',
    label: 'orders_snapshot.sql',
    desc: 'Point-in-time snapshot of the orders table showing duplicate payment entries.',
    status: 'Pending',
    statusColor: 'on-surface-variant',
    date: '2026-08-16',
  },
  {
    id: 'EV-004',
    type: 'API Trace',
    icon: 'route',
    caseRef: 'Case #884-D',
    label: 'POST /api/orders',
    desc: 'Network trace revealing double-fired POST request from rapid button clicks.',
    status: 'Analyzed',
    statusColor: 'tertiary',
    date: '2026-08-15',
  },
  {
    id: 'EV-005',
    type: 'User Report',
    icon: 'person_alert',
    caseRef: 'Case #911-B',
    label: 'Ticket #TK-4421',
    desc: 'User report: "Session drops immediately after login on Safari mobile."',
    status: 'Under Review',
    statusColor: 'amber-accent',
    date: '2026-08-14',
  },
  {
    id: 'EV-006',
    type: 'Config File',
    icon: 'settings_applications',
    caseRef: 'Case #911-B',
    label: 'auth.config.json',
    desc: 'Authentication configuration with SameSite cookie policy misconfiguration.',
    status: 'Flagged',
    statusColor: 'error',
    date: '2026-08-13',
  },
];

const categories = [
  { label: 'All', count: 6, active: true },
  { label: 'Source Code', count: 1 },
  { label: 'Logs', count: 1 },
  { label: 'Database', count: 1 },
  { label: 'API Traces', count: 1 },
  { label: 'Reports', count: 1 },
  { label: 'Config', count: 1 },
];

export default function EvidenceLockerPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-on-surface mb-xs">Evidence Locker</h1>
          <p className="text-on-surface-variant font-code-md">
            Centralized repository of all collected forensic artifacts across active cases.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-xs px-md py-xs bg-primary-container text-void font-headline-md rounded-lg hover:bg-primary transition-colors font-bold" style={{ fontSize: '14px', lineHeight: '20px' }}>
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Upload Evidence
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-xs mb-xl overflow-x-auto pb-xs">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`px-sm py-xs rounded-lg font-code-sm text-code-sm transition-colors whitespace-nowrap ${
              cat.active
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-void border border-white/10 text-on-surface-variant hover:text-on-surface hover:border-white/20'
            }`}
          >
            {cat.label}
            <span className="ml-1 opacity-60">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter">
        {evidenceItems.map((item) => (
          <article
            key={item.id}
            className="investigation-layer rounded-xl p-md flex flex-col gap-md group hover:shadow-[0_0_15px_rgba(245,185,66,0.1)] hover:border-primary/30 transition-all duration-300 cursor-pointer"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-sm">
                <div className="p-xs bg-void rounded-lg border border-white/5">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <div>
                  <span className="font-code-sm text-code-sm text-on-surface-variant block">{item.id}</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant/50">{item.caseRef}</span>
                </div>
              </div>
              <span className={`font-label-caps text-label-caps px-2 py-1 rounded-full bg-${item.statusColor}/10 text-${item.statusColor} border border-${item.statusColor}/20`}>
                {item.status}
              </span>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors mb-xs">{item.label}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">{item.desc}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-sm border-t border-white/5">
              <div className="flex items-center gap-xs text-on-surface-variant/50 font-code-sm text-code-sm">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>{item.date}</span>
              </div>
              <span className="font-code-sm text-code-sm bg-void px-2 py-1 rounded border border-white/5 text-on-surface-variant">
                {item.type}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
