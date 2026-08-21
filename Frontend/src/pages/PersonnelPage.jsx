const personnel = [
  {
    name: 'Detective Vane',
    role: 'Senior P.I.',
    rank: 'Inspector',
    xp: 24500,
    cases: 142,
    status: 'Active',
    statusColor: 'tertiary',
    avatar: 'person',
    specialties: ['Concurrency', 'Auth', 'Database'],
  },
  {
    name: 'Agent Kowalski',
    role: 'Forensic Analyst',
    rank: 'Senior Detective',
    xp: 18200,
    cases: 97,
    status: 'Active',
    statusColor: 'tertiary',
    avatar: 'engineering',
    specialties: ['Memory Leaks', 'Performance', 'Profiling'],
  },
  {
    name: 'Lt. Cipher',
    role: 'Security Specialist',
    rank: 'Chief Inspector',
    xp: 31400,
    cases: 203,
    status: 'Active',
    statusColor: 'tertiary',
    avatar: 'shield_person',
    specialties: ['XSS', 'CSRF', 'Injection'],
  },
  {
    name: 'Recruit Hayashi',
    role: 'Junior Analyst',
    rank: 'Rookie',
    xp: 1200,
    cases: 8,
    status: 'Training',
    statusColor: 'amber-accent',
    avatar: 'school',
    specialties: ['Frontend', 'CSS'],
  },
  {
    name: 'Sgt. Okafor',
    role: 'Backend Investigator',
    rank: 'Detective',
    xp: 12800,
    cases: 64,
    status: 'On Leave',
    statusColor: 'on-surface-variant',
    avatar: 'developer_board',
    specialties: ['Node.js', 'PostgreSQL', 'Docker'],
  },
];

const rankOrder = ['Rookie', 'Detective', 'Senior Detective', 'Inspector', 'Chief Inspector'];

export default function PersonnelPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-on-surface mb-xs">Personnel</h1>
          <p className="text-on-surface-variant font-code-md">
            Detective roster and investigative team directory.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <span className="font-code-sm text-on-surface-variant flex items-center gap-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            {personnel.filter((p) => p.status === 'Active').length} Active
          </span>
          <span className="font-code-sm text-on-surface-variant flex items-center gap-xs">
            <span className="w-2 h-2 rounded-full bg-amber-accent"></span>
            {personnel.filter((p) => p.status === 'Training').length} Training
          </span>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-grid-gutter mb-xl">
        <div className="glass-panel-solid rounded-xl p-md flex flex-col items-center gap-xs">
          <span className="font-code-sm text-on-surface-variant uppercase">Total Agents</span>
          <span className="font-headline-md text-headline-md text-on-surface">{personnel.length}</span>
        </div>
        <div className="glass-panel-solid rounded-xl p-md flex flex-col items-center gap-xs">
          <span className="font-code-sm text-on-surface-variant uppercase">Total Cases</span>
          <span className="font-headline-md text-headline-md text-tertiary">{personnel.reduce((a, p) => a + p.cases, 0)}</span>
        </div>
        <div className="glass-panel-solid rounded-xl p-md flex flex-col items-center gap-xs">
          <span className="font-code-sm text-on-surface-variant uppercase">Combined XP</span>
          <span className="font-headline-md text-headline-md text-amber-accent">{personnel.reduce((a, p) => a + p.xp, 0).toLocaleString()}</span>
        </div>
        <div className="glass-panel-solid rounded-xl p-md flex flex-col items-center gap-xs">
          <span className="font-code-sm text-on-surface-variant uppercase">Avg Rank</span>
          <span className="font-headline-md text-headline-md text-primary">Detective</span>
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter">
        {personnel.map((person) => (
          <article
            key={person.name}
            className="investigation-layer rounded-xl p-lg flex flex-col gap-md group hover:shadow-[0_0_15px_rgba(245,185,66,0.1)] hover:border-primary/30 transition-all duration-300"
          >
            {/* Top */}
            <div className="flex items-start gap-md">
              <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center border border-white/10 shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">{person.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">{person.name}</h3>
                <p className="font-code-sm text-code-sm text-on-surface-variant">{person.role}</p>
              </div>
              <span className={`font-label-caps text-label-caps px-2 py-1 rounded-full bg-${person.statusColor}/10 text-${person.statusColor} border border-${person.statusColor}/20 shrink-0`}>
                {person.status}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-sm bg-void rounded-lg p-sm">
              <div className="text-center">
                <div className="font-code-sm text-on-surface-variant/50 text-xs">RANK</div>
                <div className="font-code-sm text-code-sm text-amber-accent">{person.rank}</div>
              </div>
              <div className="text-center border-x border-white/5">
                <div className="font-code-sm text-on-surface-variant/50 text-xs">XP</div>
                <div className="font-code-sm text-code-sm text-on-surface">{person.xp.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="font-code-sm text-on-surface-variant/50 text-xs">CASES</div>
                <div className="font-code-sm text-code-sm text-tertiary">{person.cases}</div>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-xs mt-auto">
              {person.specialties.map((s) => (
                <span key={s} className="font-code-sm text-xs px-2 py-0.5 rounded bg-surface-variant text-on-surface border border-white/5">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}

        {/* Invite Card */}
        <article className="bg-void/50 rounded-xl border border-white/5 border-dashed p-lg flex flex-col items-center justify-center min-h-[240px] text-center gap-md cursor-pointer hover:border-primary/30 transition-colors group">
          <div className="w-12 h-12 rounded-full bg-surface-variant/30 flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary transition-colors">person_add</span>
          </div>
          <div>
            <p className="font-headline-sm text-on-surface-variant/70 group-hover:text-on-surface transition-colors">Recruit Agent</p>
            <p className="font-code-sm text-on-surface-variant/40 mt-xs">Invite a new detective to the team</p>
          </div>
        </article>
      </div>
    </div>
  );
}
