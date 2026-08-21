import { Link } from 'react-router-dom';

const coldCases = [
  {
    id: 'CC-3012',
    title: 'The Vanishing Payload',
    desc: 'HTTP request bodies intermittently arriving empty at the API gateway. Suspected middleware stripping. Archived after infrastructure migration rendered it unreproducible.',
    closedDate: '2026-06-14',
    difficulty: 'Inspector',
    difficultyColor: 'error',
    tags: ['Express', 'Nginx'],
    xp: 800,
    reason: 'Environment Changed',
  },
  {
    id: 'CC-2871',
    title: 'The Phantom CSS Collapse',
    desc: 'Flexbox layout breaks exclusively on Firefox 120+ when container has an odd-pixel width. Workaround deployed, root cause unknown.',
    closedDate: '2026-05-22',
    difficulty: 'Detective',
    difficultyColor: 'primary-container',
    tags: ['CSS', 'Firefox'],
    xp: 500,
    reason: 'Workaround Applied',
  },
  {
    id: 'CC-2540',
    title: 'Race Condition in Chat Sync',
    desc: 'Messages occasionally appear out of order when two users send messages within 50ms of each other. WebSocket ordering not guaranteed.',
    closedDate: '2026-04-08',
    difficulty: 'Chief',
    difficultyColor: 'error',
    tags: ['WebSocket', 'Redis'],
    xp: 1500,
    reason: 'Deprioritized',
  },
  {
    id: 'CC-2201',
    title: 'The Memory Leak Ghost',
    desc: 'Node.js service memory usage climbs 2MB/hour under sustained load. Heap snapshots inconclusive. Service auto-restarts mask the issue.',
    closedDate: '2026-03-15',
    difficulty: 'Inspector',
    difficultyColor: 'error',
    tags: ['Node.js', 'V8'],
    xp: 900,
    reason: 'Auto-Restart Deployed',
  },
];

export default function ColdCasesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-on-surface mb-xs">Cold Cases</h1>
          <p className="text-on-surface-variant font-code-md">
            Archived investigations — unresolved, deprioritized, or patched without root cause.
          </p>
        </div>
        <div className="flex items-center gap-xs font-code-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-sm">archive</span>
          <span>{coldCases.length} archived cases</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="glass-panel rounded-lg p-md mb-xl flex items-start gap-md">
        <span className="material-symbols-outlined text-amber-accent mt-0.5">info</span>
        <div>
          <p className="font-body-md text-on-surface-variant">
            Cold cases are investigations that were shelved before full resolution. They may be reopened if new evidence surfaces or conditions change. Reopening a cold case awards <span className="text-amber-accent font-bold">bonus XP</span>.
          </p>
        </div>
      </div>

      {/* Cases List */}
      <div className="flex flex-col gap-grid-gutter">
        {coldCases.map((c) => (
          <article
            key={c.id}
            className="investigation-layer rounded-xl p-lg flex flex-col md:flex-row gap-lg group hover:shadow-[0_0_15px_rgba(245,185,66,0.1)] hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Frost overlay indicator */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="flex-1 flex flex-col gap-sm">
              {/* Top */}
              <div className="flex flex-wrap items-center gap-sm">
                <span className="font-code-sm text-code-sm text-on-surface-variant bg-void px-2 py-1 rounded border border-white/5">
                  CASE #{c.id}
                </span>
                <span className={`font-label-caps text-label-caps px-2 py-1 rounded-full bg-${c.difficultyColor}/20 text-${c.difficultyColor} border border-${c.difficultyColor}/20`}>
                  {c.difficulty}
                </span>
                <span className="font-label-caps text-label-caps px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  {c.reason}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 max-w-2xl">{c.desc}</p>

              {/* Tags & Date */}
              <div className="flex flex-wrap items-center gap-sm mt-auto">
                {c.tags.map((tag) => (
                  <span key={tag} className="font-code-sm text-xs px-2 py-0.5 rounded bg-surface-variant text-on-surface">
                    {tag}
                  </span>
                ))}
                <span className="font-code-sm text-code-sm text-on-surface-variant/50 ml-auto flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm">event</span>
                  Archived {c.closedDate}
                </span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-md shrink-0">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-sm">toll</span>
                <span className="font-code-sm font-bold">+{c.xp} XP</span>
              </div>
              <button className="font-code-md text-sm border border-amber-accent/30 bg-void text-amber-accent px-md py-xs rounded-lg hover:bg-amber-accent/10 hover:border-amber-accent/60 transition-colors flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm">lock_open</span>
                Reopen
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
