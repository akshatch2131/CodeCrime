import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="font-body-md text-body-md antialiased min-h-screen bg-grid bg-grid-pattern relative">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-xl h-16 sticky top-0 z-50 bg-background border-b border-white/10">
        <div className="flex items-center gap-md">
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">CodeCrime</span>
        </div>
        <div className="flex items-center gap-lg">
          <Link to="/login" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-primary-container text-void font-headline-sm uppercase px-lg py-xs rounded font-bold hover:bg-primary transition-colors active:scale-95 text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-grid-margin py-24 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="z-10 max-w-4xl mx-auto flex flex-col items-center gap-lg">
          {/* Badge */}
          <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-investigation border border-white/10 mb-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              CASE #404: THE MISSING DEPENDENCY
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline-lg text-headline-lg md:text-5xl lg:text-6xl text-on-background max-w-3xl leading-tight">
            Become the Detective <br />
            <span className="text-primary">Every Bug Fears.</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-md">
            Step into the terminal. Investigate real-world software failures, piece together the evidence, and close cases. High-stakes forensic debugging meets interactive narrative.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-md mt-lg">
            <Link
              to="/register"
              className="bg-primary-container text-void font-headline-sm text-headline-sm uppercase px-xl py-sm rounded font-bold hover:bg-primary transition-colors active:scale-95"
            >
              Start Investigating
            </Link>
            <Link
              to="/cases"
              className="border border-primary-container text-primary-container font-headline-sm text-headline-sm uppercase px-xl py-sm rounded font-bold hover:bg-primary-container/10 transition-colors active:scale-95"
            >
              View Dossier
            </Link>
          </div>
        </div>

        {/* Code Snippet Preview */}
        <div className="mt-20 w-full max-w-3xl glass-panel rounded-lg overflow-hidden shadow-2xl z-10 relative group">
          <div className="flex items-center justify-between px-md py-xs bg-void border-b border-white/10">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary text-sm">terminal</span>
              <span className="font-code-sm text-code-sm text-on-surface-variant">src/auth/validate.js</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              <div className="w-3 h-3 rounded-full bg-tertiary"></div>
            </div>
          </div>
          <div className="p-lg bg-void/80 font-code-md text-code-md text-on-secondary-container overflow-x-auto">
            <pre><code>{`<span class="text-tertiary">function</span> <span class="text-primary">validateToken</span>(token) {
  <span class="text-on-surface-variant">// TODO: Add signature verification</span>
  <span class="text-tertiary">if</span> (!token) <span class="text-tertiary">return</span> <span class="text-error">false</span>;
  
  <span class="text-tertiary">const</span> decoded = jwt.decode(token);
  <span class="text-tertiary">if</span> (decoded.exp < Date.now() / <span class="text-primary-container">1000</span>) {
    <span class="text-error">throw new Error</span>(<span class="text-tertiary">'Token expired'</span>);
  }
  
  return true; // CRITICAL VULNERABILITY: Unverified JWT
}`}</code></pre>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-grid-margin py-24 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-background">Forensic Toolkit</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm max-w-xl">
            Everything you need to dissect complex systems and uncover the truth behind the stack trace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-grid-gutter">
          {[
            { icon: 'bug_report', title: 'Real Debugging Cases', desc: 'Investigate actual production bugs from open-source projects. No synthetic generic scenarios.' },
            { icon: 'inventory_2', title: 'Full System Evidence', desc: 'Access server logs, database dumps, and user reports. Piece together the full picture.' },
            { icon: 'psychology', title: 'AI-Powered Hints', desc: "Stuck on a lead? Your AI partner can provide contextual nudges without spoiling the case." },
            { icon: 'military_tech', title: 'Gamified Progress', desc: 'Earn XP, rank up from Rookie to Senior P.I., and unlock highly classified complex incidents.' },
          ].map((feature) => (
            <div key={feature.title} className="glass-panel p-lg rounded-lg glow-hover transition-all duration-300 flex flex-col items-start gap-md group cursor-pointer">
              <div className="p-sm bg-surface-container-high rounded-md tech-border group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">{feature.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-background mb-xs">{feature.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-grid-margin py-24 bg-void border-y border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-16 text-center">Standard Operating Procedure</h2>

          <div className="relative pl-lg md:pl-0">
            <div className="timeline-line md:hidden"></div>
            <div className="flex flex-col gap-12">
              {[
                { num: '01', icon: 'folder_open', title: 'Choose Case', desc: 'Select a brief from the dispatch board based on difficulty and technology stack.' },
                { num: '02', icon: 'search', title: 'Investigate', desc: 'Analyze stack traces, read user reports, and cross-reference server logs for anomalies.' },
                { num: '03', icon: 'my_location', title: 'Find Bug', desc: 'Pinpoint the exact line of code or misconfiguration causing the systemic failure.', highlight: true },
                { num: '04', icon: 'build', title: 'Fix Code', desc: 'Submit your patch. The automated test suite acts as the judge and jury.' },
                { num: '05', icon: 'star', title: 'Earn XP', desc: 'Close the case, earn reputation points, and update your detective rank.' },
              ].map((step) => (
                <div key={step.num} className="relative flex flex-col md:flex-row items-start md:items-center gap-lg">
                  <div className="absolute -left-lg md:static w-8 h-8 rounded-full bg-surface-container-high tech-border flex items-center justify-center z-10">
                    <span className="font-code-sm text-code-sm text-primary">{step.num}</span>
                  </div>
                  <div className={`glass-panel flex-1 p-lg rounded-lg w-full flex items-center gap-md ${step.highlight ? 'border-l-2 border-l-primary' : ''}`}>
                    <div className="p-sm bg-void rounded border border-white/5 hidden sm:block">
                      <span className={`material-symbols-outlined ${step.highlight ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {step.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-background">{step.title}</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-xs">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-grid-margin py-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="font-code-sm text-code-sm text-on-surface-variant">© 2026 CodeCrime. All rights reserved.</span>
          <div className="flex gap-lg">
            <Link to="/login" className="font-code-sm text-code-sm text-on-surface-variant hover:text-primary transition-colors">Sign In</Link>
            <Link to="/register" className="font-code-sm text-code-sm text-on-surface-variant hover:text-primary transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
