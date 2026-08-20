import { Link, useParams } from 'react-router-dom';

export default function CaseBriefingPage() {
  const { id } = useParams();

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col antialiased overflow-x-hidden selection:bg-primary-container selection:text-background">
      <main className="flex-1 w-full flex flex-col bg-grid-subtle relative">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary-container/5 to-transparent pointer-events-none"></div>

        {/* Back Navigation */}
        <nav className="w-full px-xl py-lg flex items-center justify-between z-10 relative">
          <Link to="/cases" className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-code-md text-code-md group">
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>cd .. / Active Cases</span>
          </Link>
          <div className="font-label-caps text-label-caps text-primary border border-primary/20 bg-primary/5 px-sm py-[2px] rounded-full flex items-center gap-xs">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"></div>
            BRIEFING_MODE_ACTIVE
          </div>
        </nav>

        <div className="max-w-6xl mx-auto w-full px-grid-margin pb-xl flex-1 flex flex-col justify-center z-10">
          {/* Header Section */}
          <header className="mb-xl text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-lg border-b border-white/10 pb-lg">
            <div>
              <h2 className="font-code-md text-code-md text-primary mb-base">CASE_FILE // #{id || '142'}</h2>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">The Silent Deadlock</h1>
            </div>
            <div className="flex gap-md font-code-sm text-code-sm text-on-surface-variant">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>40-55 min</span>
              </div>
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-tertiary">star</span>
                <span className="text-tertiary">900 XP</span>
              </div>
            </div>
          </header>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
            {/* Left Column */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-grid-gutter">
              {/* Incident Report */}
              <section className="investigation-layer rounded-lg p-lg glow-hover">
                <div className="flex items-center gap-sm mb-md border-b border-white/5 pb-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Incident Report</h3>
                </div>
                <div className="font-body-lg text-body-lg text-on-surface-variant space-y-md leading-relaxed">
                  <p>
                    At 03:00 hours, critical background workers responsible for processing the nightly transaction queue ceased all output. System health checks report the host instances are online and consuming normal CPU, but the queue depth is rising exponentially.
                  </p>
                  <p>
                    Initial recon suggests a complex concurrency issue. Multiple threads appear to be contending for the same transactional records. There are whispers in the logs of a newly introduced distributed lock implementation pushed to production late yesterday. Your job is to trace the execution flow, identify where the threads are entangled, and break the deadlock.
                  </p>
                </div>
              </section>

              {/* Parameters & Skills */}
              <section className="investigation-layer rounded-lg p-lg">
                <div className="flex items-center gap-sm mb-md border-b border-white/5 pb-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Parameters & Skills</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-md">
                  <div>
                    <h4 className="font-code-sm text-code-sm text-on-surface-variant mb-xs">DIFFICULTY LEVEL</h4>
                    <div className="inline-block bg-error/10 border border-error/30 text-error font-label-caps text-label-caps px-sm py-1 rounded-full">
                      INSPECTOR
                    </div>
                  </div>
                  <div>
                    <h4 className="font-code-sm text-code-sm text-on-surface-variant mb-xs">CATEGORY</h4>
                    <div className="font-body-md text-body-md text-on-surface">Concurrency & Architecture</div>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-code-sm text-code-sm text-on-surface-variant mb-xs">REQUIRED SKILLS</h4>
                    <div className="flex flex-wrap gap-xs">
                      {['Concurrency', 'Threads', 'Locks'].map((skill) => (
                        <span key={skill} className="font-code-sm text-code-sm bg-surface-variant text-on-surface px-sm py-1 border border-white/5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-grid-gutter">
              <section className="investigation-layer rounded-lg p-lg h-full flex flex-col">
                <div className="flex items-center justify-between mb-md border-b border-white/5 pb-sm">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Evidence Locker</h3>
                  </div>
                  <span className="font-code-sm text-code-sm text-on-surface-variant">4 Items</span>
                </div>

                <ul className="flex-1 space-y-sm mt-xs">
                  {[
                    { icon: 'code', label: 'Source Code' },
                    { icon: 'terminal', label: 'Application Logs' },
                    { icon: 'database', label: 'Database State' },
                    { icon: 'route', label: 'API Traces' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-md p-sm terminal-block rounded glow-hover cursor-default group">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">{item.icon}</span>
                      <span className="font-code-md text-code-md text-on-surface group-hover:text-primary transition-colors">{item.label}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-lg pt-lg border-t border-white/10">
                  <Link
                    to={`/investigate/${id || '142'}`}
                    className="w-full bg-primary-container text-background font-headline-sm text-headline-sm font-bold uppercase tracking-wide py-md px-lg rounded hover:bg-primary transition-all active:scale-95 cta-glow flex items-center justify-center gap-sm"
                  >
                    <span className="material-symbols-outlined">play_arrow</span>
                    Start Investigation
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
