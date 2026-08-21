import { Link } from 'react-router-dom';

const cases = [
  {
    id: '902-A',
    title: 'The Silent Deadlock',
    desc: 'Transaction threads are hanging indefinitely during high-volume checkout events. No error logs emitted.',
    difficulty: 'Chief',
    difficultyColor: 'error',
    difficultyIcon: 'warning',
    tags: ['PostgreSQL', 'Node.js'],
    xp: 1200,
  },
  {
    id: '884-D',
    title: 'Duplicate Payment',
    desc: 'Users reporting being double-charged when quickly double-clicking the submit order button on slow connections.',
    difficulty: 'Detective',
    difficultyColor: 'primary-container',
    difficultyIcon: 'policy',
    tags: ['React', 'Stripe API'],
    xp: 650,
  },
  {
    id: '911-B',
    title: 'The Missing Auth Token',
    desc: 'Session drops immediately after successful login on mobile web browsers Safari only.',
    difficulty: 'Rookie',
    difficultyColor: 'secondary',
    difficultyIcon: 'local_police',
    tags: ['JWT', 'Express'],
    xp: 200,
  },
];

export default function CaseRepositoryPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-on-surface mb-xs">Case Repository</h1>
          <p className="text-on-surface-variant font-code-md">Directory of active anomalies, bugs, and logical fractures.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-sm mb-xl p-sm bg-investigation/80 backdrop-blur-sm border border-white/10 rounded-lg">
        <div className="flex items-center gap-xs px-sm py-1 border-r border-white/10">
          <span className="material-symbols-outlined text-sm text-on-surface-variant">filter_list</span>
          <span className="font-label-caps text-on-surface-variant">Filters</span>
        </div>
        <select className="bg-void border border-white/10 rounded text-sm text-on-surface py-1.5 px-3 focus:outline-none focus:border-primary font-code-sm">
          <option value="">Difficulty: All</option>
          <option value="rookie">Rookie</option>
          <option value="detective">Detective</option>
          <option value="chief">Chief</option>
        </select>
        <select className="bg-void border border-white/10 rounded text-sm text-on-surface py-1.5 px-3 focus:outline-none focus:border-primary font-code-sm">
          <option value="">Category: All</option>
          <option value="auth">Authentication</option>
          <option value="db">Database</option>
          <option value="ui">Frontend UI</option>
          <option value="api">API Logic</option>
        </select>
        <select className="bg-void border border-white/10 rounded text-sm text-on-surface py-1.5 px-3 focus:outline-none focus:border-primary font-code-sm">
          <option value="">Tech: All</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
        </select>
        <div className="ml-auto flex items-center gap-sm">
          <span className="font-code-sm text-on-surface-variant">Showing 24 Active Leads</span>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter">
        {cases.map((c) => (
          <article key={c.id} className="bg-investigation rounded-xl border border-white/10 p-md flex flex-col gap-md relative group hover:shadow-[0_0_15px_rgba(245,185,66,0.1)] hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="font-code-sm text-on-surface-variant bg-void px-2 py-1 rounded border border-white/5">
                CASE #{c.id}
              </span>
              <span className={`font-label-caps px-2 py-1 rounded-full bg-${c.difficultyColor}/20 text-${c.difficultyColor} border border-${c.difficultyColor}/20 flex items-center gap-1`}>
                <span className="material-symbols-outlined text-[10px] fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {c.difficultyIcon}
                </span>
                {c.difficulty}
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{c.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {c.tags.map((tag) => (
                <span key={tag} className="font-code-sm text-xs px-2 py-0.5 rounded bg-surface-variant text-on-surface">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-sm pt-sm border-t border-white/5">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-sm">toll</span>
                <span className="font-code-sm font-bold">+{c.xp} XP</span>
              </div>
              <Link
                to={`/case/${c.id}`}
                className="font-code-md text-sm border border-white/10 bg-void text-primary px-4 py-1.5 rounded hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                Investigate
              </Link>
            </div>
          </article>
        ))}

        {/* Empty State */}
        <article className="bg-void/50 rounded-xl border border-white/5 border-dashed p-md flex flex-col items-center justify-center min-h-[240px] text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-2">radar</span>
          <p className="font-code-md text-on-surface-variant/70">Scanning for new anomalies...</p>
        </article>
      </div>
    </div>
  );
}
