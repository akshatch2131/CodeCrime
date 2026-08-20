import { Link } from 'react-router-dom';

export default function CaseResolutionPage() {
  return (
    <div className="text-on-background min-h-screen flex items-center justify-center p-md lg:p-xl relative overflow-x-hidden bg-ambient">
      <main className="w-full max-w-5xl flex flex-col gap-xl relative z-10">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center text-center gap-sm animate-stamp">
          <div className="h-16 w-16 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-xs">
            <span className="material-symbols-outlined fill text-tertiary" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>
              task_alt
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-widest">Investigation Complete</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant flex items-center gap-xs">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>folder_special</span>
            Case #CC-7042: The Phantom Null Reference
          </p>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-md">
          {/* XP */}
          <div className="glass-panel rounded-xl p-md flex flex-col justify-center items-center gap-xs hover:border-surface-tint/50 transition-colors">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">XP Earned</span>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined fill text-surface-tint" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="font-headline-md text-headline-md text-surface-tint">+1,250</span>
            </div>
          </div>

          {/* Tests */}
          <div className="glass-panel rounded-xl p-md flex flex-col justify-center items-center gap-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Tests Passed</span>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-tertiary" style={{ fontSize: '20px' }}>checklist</span>
              <span className="font-headline-md text-headline-md text-tertiary">42/42</span>
            </div>
          </div>

          {/* Accuracy */}
          <div className="glass-panel rounded-xl p-md flex flex-col justify-center items-center gap-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Accuracy</span>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>my_location</span>
              <span className="font-headline-md text-headline-md text-on-surface">99.8%</span>
            </div>
          </div>

          {/* Time */}
          <div className="glass-panel rounded-xl p-md flex flex-col justify-center items-center gap-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Time Taken</span>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>timer</span>
              <span className="font-headline-md text-headline-md text-on-surface">14m 22s</span>
            </div>
          </div>

          {/* Hints */}
          <div className="glass-panel rounded-xl p-md flex flex-col justify-center items-center gap-xs col-span-2 lg:col-span-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Hints Used</span>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>lightbulb</span>
              <span className="font-headline-md text-headline-md text-on-surface">0</span>
            </div>
            <span className="font-label-caps text-label-caps text-surface-tint bg-surface-tint/10 px-2 py-0.5 rounded-full mt-1">Impeccable</span>
          </div>
        </section>

        {/* Code Comparison */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-grid-gutter">
          {/* Your Diagnosis */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
            <div className="bg-surface-variant/50 px-md py-sm border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(102,250,140,0.5)]"></div>
                <span className="font-headline-sm text-headline-sm text-on-surface">Your Diagnosis</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">diff.js</span>
            </div>
            <div className="p-md bg-surface-container-lowest flex-1 overflow-x-auto">
              <pre className="font-code-md text-code-md">
                <code>
                  <span className="syntax-punctuation">function </span>
                  <span className="syntax-keyword">processUserData</span>(user) {'{'}
                  {'\n'}
                  <span className="syntax-comment">{'  // Null check added'}</span>
                  {'\n'}
                  {'  '}<span className="syntax-keyword">if</span> (!user || !user.profile) {'{'}
                  {'\n'}
                  {'    '}<span className="syntax-keyword">return</span> null;
                  {'\n'}
                  {'  }'}
                  {'\n\n'}
                  {'  '}<span className="syntax-keyword">return</span> user.profile.name;
                  {'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>

          {/* Original Bug */}
          <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
            <div className="bg-surface-variant/50 px-md py-sm border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-sm">
                <div className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]"></div>
                <span className="font-headline-sm text-headline-sm text-on-surface">Original Bug</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">target.js</span>
            </div>
            <div className="p-md bg-surface-container-lowest flex-1 overflow-x-auto opacity-75">
              <pre className="font-code-md text-code-md">
                <code>
                  <span className="syntax-punctuation">function </span>
                  <span className="syntax-keyword">processUserData</span>(user) {'{'}
                  {'\n'}
                  <span className="syntax-comment">{'  // Unsafe access leading to TypeError'}</span>
                  {'\n\n\n\n'}
                  {'  '}<span className="syntax-keyword">return</span> user.profile.name;
                  {'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* AI Feedback */}
        <section className="glass-panel rounded-xl p-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-surface-tint/30 rounded-tl-xl"></div>
          <div className="flex items-start gap-md relative z-10">
            <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-primary">memory</span>
            </div>
            <div className="flex flex-col gap-sm">
              <h3 className="font-headline-sm text-headline-sm text-primary">Forensic Analysis Report</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Optimal resolution executed. By implementing early return guards, you successfully mitigated the{' '}
                <code className="font-code-sm text-error bg-error/10 px-1 rounded">TypeError: Cannot read properties of undefined</code>{' '}
                vulnerability. Time complexity remains{' '}
                <code className="font-code-sm text-tertiary bg-tertiary/10 px-1 rounded">O(1)</code>.
                No structural degradation detected in surrounding modules. Ready for commit to the main evidence locker.
              </p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <footer className="flex flex-col lg:flex-row justify-between items-center gap-md mt-md pt-lg border-t border-white/10">
          <Link
            to="/dashboard"
            className="w-full lg:w-auto font-label-caps text-label-caps uppercase text-secondary hover:text-on-surface flex items-center justify-center gap-xs py-sm px-md transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            Back to Dashboard
          </Link>
          <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-sm">
            <button className="w-full lg:w-auto border border-primary-container text-primary-container hover:bg-primary-container/10 font-headline-md text-base uppercase px-lg py-sm rounded-lg transition-colors flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>plagiarism</span>
              View Solution
            </button>
            <Link
              to="/cases"
              className="w-full lg:w-auto bg-primary-container text-void hover:brightness-110 font-headline-md text-base uppercase px-lg py-sm rounded-lg cta-glow transition-all flex items-center justify-center gap-xs"
            >
              Next Case
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
