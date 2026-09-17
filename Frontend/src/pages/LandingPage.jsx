import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page bg-grid">
      {/* TopNavBar */}
      <nav className="landing-nav">
        <div>
          <span className="landing-nav-brand">CodeCrime</span>
        </div>
        <div className="landing-nav-links">
          <Link to="/login" className="landing-nav-signin">Sign In</Link>
          <Link to="/register" className="landing-nav-cta">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="landing-hero-glow"></div>

        <div className="landing-hero-content">
          <div className="landing-badge">
            <span className="landing-badge-dot"></span>
            <span className="landing-badge-text">Debug Like a Detective</span>
          </div>

          <h1 className="landing-headline">
            Master the Art of <br />
            <span className="landing-headline-accent">Debugging JavaScript.</span>
          </h1>

          <p className="landing-subtitle">
            Analyze buggy code, identify the errors, fix them, and verify with test cases. 
            A gamified platform to build real-world debugging skills.
          </p>

          <div className="landing-ctas">
            <Link to="/register" className="landing-cta-primary">Start Debugging</Link>
            <Link to="/problems" className="landing-cta-secondary">View Problems</Link>
          </div>
        </div>

        {/* Code Preview */}
        <div className="landing-code-preview glass-panel">
          <div className="landing-code-header">
            <div className="landing-code-header-left">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '16px' }}>terminal</span>
              <span className="landing-code-filename">buggy_sum.js</span>
            </div>
            <div className="landing-code-dots">
              <div className="landing-code-dot red"></div>
              <div className="landing-code-dot yellow"></div>
              <div className="landing-code-dot green"></div>
            </div>
          </div>
          <div className="landing-code-body">
            <pre><code>{`function calculateSum(arr) {
    let sum = 0;

    for (let i = 0; i <= arr.length; i++) {  // 🐛 Bug here!
        sum += arr[i];
    }

    return sum;  // Returns NaN instead of correct sum
}`}</code></pre>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-features-header">
          <h2 className="landing-features-title">Why CodeCrime?</h2>
          <p className="landing-features-subtitle">
            Unlike traditional coding platforms, CodeCrime teaches you to read, analyze, and fix existing code — the skill you use most in real jobs.
          </p>
        </div>

        <div className="landing-features-grid">
          {[
            { icon: 'bug_report', title: 'Real Debugging Problems', desc: 'Analyze existing buggy JavaScript code. No writing from scratch — just like real-world development.' },
            { icon: 'play_circle', title: 'Run Test Cases', desc: 'Execute your fixes against predefined test cases and see results instantly.' },
            { icon: 'psychology', title: 'AI-Powered Hints', desc: "Stuck? Get contextual hints powered by AI without giving away the answer." },
            { icon: 'military_tech', title: 'Gamified Progress', desc: 'Earn XP, level up from Rookie to Expert, and compete on the leaderboard.' },
          ].map((feature) => (
            <div key={feature.title} className="landing-feature-card glass-panel glow-hover">
              <div className="landing-feature-icon">
                <span className="material-symbols-outlined">{feature.icon}</span>
              </div>
              <div>
                <h3 className="landing-feature-title">{feature.title}</h3>
                <p className="landing-feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-steps">
        <div className="landing-steps-inner">
          <h2 className="landing-steps-title">How It Works</h2>

          <div className="landing-steps-list">
            {[
              { num: '01', icon: 'folder_open', title: 'Choose a Problem', desc: 'Browse debugging problems by difficulty and category.' },
              { num: '02', icon: 'search', title: 'Analyze the Code', desc: 'Read the buggy JavaScript code and understand what it should do.' },
              { num: '03', icon: 'my_location', title: 'Find the Bug', desc: 'Pinpoint the exact line causing the issue.', highlight: true },
              { num: '04', icon: 'build', title: 'Fix & Test', desc: 'Edit the code in our Monaco editor and run test cases to verify.' },
              { num: '05', icon: 'star', title: 'Earn XP', desc: 'Submit your fix, receive a score, and climb the leaderboard.' },
            ].map((step) => (
              <div key={step.num} className="landing-step">
                <div className="landing-step-number">{step.num}</div>
                <div className={`landing-step-content glass-panel ${step.highlight ? 'highlight' : ''}`}>
                  <div className="landing-step-icon">
                    <span className="material-symbols-outlined" style={{ color: step.highlight ? 'var(--color-primary)' : 'var(--color-on-surface-variant)' }}>
                      {step.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="landing-step-title">{step.title}</h4>
                    <p className="landing-step-desc">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <span className="landing-footer-copy">© 2026 CodeCrime. All rights reserved.</span>
          <div className="landing-footer-links">
            <Link to="/login" className="landing-footer-link">Sign In</Link>
            <Link to="/register" className="landing-footer-link">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
