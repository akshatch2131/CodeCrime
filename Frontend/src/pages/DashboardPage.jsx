import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const heatmapData = [
  0, 20, 60, 100, 0, 0, 40,
  0, 0, 80, 20, 40, 0, 0,
  40, 0, 20, 0, 0, 60, 80,
];

export default function DashboardPage() {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cases');

        if (!response.ok) {
          throw new Error('Failed to fetch case');
        }

        const result = await response.json();

        if (!result.success || !result.cases.length) {
          throw new Error('No published cases found');
        }

        // For Tuesday evaluation, use the first published case.
        setCaseData(result.cases[0]);
      } catch (err) {
        console.error('Case fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-lg">

      {/* Welcome Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Overview
        </h2>

        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Here are the latest leads, Detective.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">

        {/* Cases Solved */}
        <div className="glass-panel-solid p-lg rounded-xl glow-hover transition-all flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="font-code-sm text-on-surface-variant uppercase tracking-wider">
              Cases Solved
            </span>

            <span className="material-symbols-outlined text-tertiary">
              check_circle
            </span>
          </div>

          <div className="z-10">
            <span className="font-headline-lg text-headline-lg text-on-surface">
              1,024
            </span>

            <span className="font-code-sm text-tertiary ml-2">
              +12 this week
            </span>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-1/2 opacity-20"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(102, 250, 140, 0.2) 100%)',
            }}
          >
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <polyline
                fill="none"
                points="0,100 20,80 40,85 60,40 80,60 100,20"
                stroke="#66fa8c"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Total XP */}
        <div className="glass-panel-solid p-lg rounded-xl glow-hover transition-all flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="font-code-sm text-on-surface-variant uppercase tracking-wider">
              Total XP
            </span>

            <span className="material-symbols-outlined text-amber-accent">
              stars
            </span>
          </div>

          <div className="z-10">
            <span className="font-headline-lg text-headline-lg text-on-surface">
              24,500
            </span>
          </div>

          <div className="absolute bottom-md left-md right-md h-2 bg-void rounded-full z-10">
            <div
              className="h-full bg-amber-accent rounded-full"
              style={{ width: '82%' }}
            ></div>
          </div>
        </div>

        {/* Active Streak */}
        <div className="glass-panel-solid p-lg rounded-xl glow-hover transition-all flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="font-code-sm text-on-surface-variant uppercase tracking-wider">
              Active Streak
            </span>

            <span className="material-symbols-outlined text-error">
              local_fire_department
            </span>
          </div>

          <div className="z-10">
            <span className="font-headline-lg text-headline-lg text-on-surface">
              14 Days
            </span>
          </div>

          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '120px',
                lineHeight: 1,
                transform: 'translate(20%, 20%)',
              }}
            >
              local_fire_department
            </span>
          </div>
        </div>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">

        {/* Case of the Day */}
        <div className="lg:col-span-2 glass-panel-solid rounded-xl flex flex-col overflow-hidden relative">

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          ></div>

          <div className="p-lg border-b border-white/10 flex justify-between items-center bg-void/50 z-10">

            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-error">
                priority_high
              </span>

              <h3 className="font-headline-sm text-headline-sm">
                Case of the Day
              </h3>
            </div>

            {/* Dynamic Difficulty */}
            {caseData && (
              <span className="px-2 py-1 rounded-full bg-error/20 text-error font-label-caps border border-error/30">
                Difficulty: {caseData.difficulty}
              </span>
            )}

          </div>

          <div className="p-lg flex-1 flex flex-col justify-between z-10">

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-xl">
                <p className="font-code-md text-on-surface-variant">
                  Loading case...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="py-xl">
                <p className="text-error font-code-md">
                  Unable to load case: {error}
                </p>
              </div>
            )}

            {/* Case */}
            {!loading && !error && caseData && (
              <div>

                {/* Dynamic Case Title */}
                <h4 className="font-headline-lg text-headline-lg text-amber-accent mb-sm">
                  Case #{caseData.case_number} — {caseData.title}
                </h4>

                {/* Dynamic Description */}
                <p className="font-body-md text-on-surface-variant mb-md max-w-2xl">
                  {caseData.description}
                </p>

                {/* Case Metadata */}
                <div className="flex flex-wrap gap-sm mb-lg">

                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-code-sm text-on-surface-variant">
                    {caseData.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-code-sm text-on-surface-variant">
                    {caseData.technology}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-amber-accent/10 border border-amber-accent/20 font-code-sm text-amber-accent">
                    {caseData.xp_reward} XP
                  </span>

                </div>

                {/* Log snippet */}
                <div className="bg-void border border-white/10 rounded-lg p-sm font-code-md text-on-surface-variant mb-lg overflow-x-auto">

                  <div className="flex items-center justify-between border-b border-white/10 pb-xs mb-xs">

                    <span className="text-xs text-on-surface-variant/70">
                      /var/log/threads.log
                    </span>

                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>

                  </div>

                  <pre className="text-sm">
                    <code>{`[10:42:01] Thread-1 acquired lock A
[10:42:02] Thread-2 acquired lock B
[10:42:05] Thread-1 requesting lock B (WAITING)
[10:42:07] Thread-2 requesting lock A (WAITING)
... CRITICAL: Deadlock detected.`}</code>
                  </pre>

                </div>
              </div>
            )}

            {/* Buttons */}
            {!loading && !error && caseData && (
              <div className="flex justify-end gap-md">

                <Link
                  to={`/case/${caseData.id}`}
                  className="px-lg py-sm border border-white/20 text-on-surface rounded-lg font-headline-md hover:bg-white/5 transition-colors"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  View Briefing
                </Link>

                <Link
                  to={`/investigate/${caseData.id}`}
                  className="bg-amber-accent text-void font-headline-md uppercase font-bold py-sm px-lg rounded-lg hover:bg-primary transition-colors cta-glow"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  Investigate File
                </Link>

              </div>
            )}

          </div>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-1 flex flex-col gap-grid-gutter">

          {/* Heatmap */}
          <div className="glass-panel-solid rounded-xl p-lg flex flex-col h-full">

            <h3 className="font-headline-sm text-headline-sm mb-md flex items-center gap-xs">
              <span className="material-symbols-outlined text-on-surface-variant">
                calendar_month
              </span>

              Activity Log
            </h3>

            <div className="flex-1 flex flex-col justify-center">

              <div className="grid grid-cols-7 gap-1">

                {heatmapData.map((val, i) => (
                  <div
                    key={i}
                    className="w-full aspect-square rounded-sm"
                    style={{
                      backgroundColor:
                        val === 0
                          ? '#12141A'
                          : `rgba(102, 250, 140, ${val / 100})`,
                    }}
                  ></div>
                ))}

              </div>

              <div className="flex justify-between items-center mt-sm font-code-sm text-on-surface-variant text-xs">

                <span>Less</span>

                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-void rounded-sm"></div>

                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: 'rgba(102,250,140,0.2)',
                    }}
                  ></div>

                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: 'rgba(102,250,140,0.6)',
                    }}
                  ></div>

                  <div className="w-3 h-3 bg-tertiary rounded-sm"></div>
                </div>

                <span>More</span>

              </div>
            </div>
          </div>

          {/* Rank Progress */}
          <div className="glass-panel-solid rounded-xl p-lg">

            <h3 className="font-headline-sm text-headline-sm mb-md flex items-center gap-xs">

              <span className="material-symbols-outlined text-on-surface-variant">
                military_tech
              </span>

              Promotion Track

            </h3>

            <div className="space-y-md">

              <div className="flex justify-between items-end">

                <div className="flex flex-col">
                  <span className="font-code-sm text-on-surface-variant">
                    Current Rank
                  </span>

                  <span className="font-headline-sm text-headline-sm text-amber-accent">
                    Senior P.I.
                  </span>
                </div>

                <div className="flex flex-col items-end">

                  <span className="font-code-sm text-on-surface-variant">
                    Next Rank
                  </span>

                  <span className="font-body-md text-on-surface">
                    Chief Inspector
                  </span>

                </div>

              </div>

              <div className="relative pt-1">

                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-void border border-white/5">

                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-accent relative"
                    style={{ width: '65%' }}
                  >
                    <div className="absolute inset-0 bg-white/20 blur-[2px]"></div>
                  </div>

                </div>

                <div className="flex justify-between font-code-sm text-on-surface-variant">

                  <span>2,450 XP</span>
                  <span>3,000 XP</span>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}