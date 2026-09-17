import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('All fields are required.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-grid bg-grid"></div>
        <div className="auth-left-glow"></div>
        <div className="auth-left-content">
          <h1 className="auth-left-title">Become a better developer through debugging.</h1>
          <p className="auth-left-desc">
            Join CodeCrime and sharpen your debugging skills with real JavaScript problems. Analyze, fix, and verify buggy code.
          </p>
          <div className="auth-code-block">
            <div className="auth-code-header">
              <div className="auth-code-dot red"></div>
              <div className="auth-code-dot yellow"></div>
              <div className="auth-code-dot green"></div>
              <span className="auth-code-filename">welcome.js</span>
            </div>
            <div className="auth-code-body">
              <pre><code>{`// Welcome to CodeCrime
const developer = {
  name: "You",
  level: "Rookie",
  xp: 0,
  mission: "Debug everything."
};

console.log("Ready to start?");`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <span className="material-symbols-outlined auth-form-icon">terminal</span>
            <h2 className="auth-form-title">Create your account</h2>
            <p className="auth-form-subtitle">Start debugging your first problem today.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="fullName">Full Name</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-outlined auth-input-icon">badge</span>
                <input className="auth-input" id="fullName" placeholder="Your Name" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="regEmail">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-outlined auth-input-icon">mail</span>
                <input className="auth-input" id="regEmail" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              </div>
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <label className="auth-label" htmlFor="regPassword">Password</label>
                <div className="auth-input-wrapper">
                  <span className="material-symbols-outlined auth-input-icon">key</span>
                  <input className="auth-input" id="regPassword" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="confirmPassword">Confirm</label>
                <div className="auth-input-wrapper">
                  <span className="material-symbols-outlined auth-input-icon">lock_reset</span>
                  <input className="auth-input" id="confirmPassword" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
                </div>
              </div>
            </div>

            {error && (
              <div className="auth-error"><p>{error}</p></div>
            )}

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
