import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
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
          <h1 className="auth-left-title">Debug like a detective. Code like a pro.</h1>
          <p className="auth-left-desc">
            Access your debugging workspace. Analyze buggy JavaScript code, fix errors, and verify your solutions with test cases.
          </p>
          <div className="auth-code-block">
            <div className="auth-code-header">
              <div className="auth-code-dot red"></div>
              <div className="auth-code-dot yellow"></div>
              <div className="auth-code-dot green"></div>
              <span className="auth-code-filename">buggy_code.js</span>
            </div>
            <div className="auth-code-body">
              <pre><code>{`function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i]; // Bug: off-by-one
  }
  return sum;
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <span className="material-symbols-outlined auth-form-icon">terminal</span>
            <h2 className="auth-form-title">Welcome back, Developer</h2>
            <p className="auth-form-subtitle">Enter your credentials to access the platform.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-outlined auth-input-icon">mail</span>
                <input className="auth-input" id="email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">
                <span>Password</span>
                <a>Forgot?</a>
              </label>
              <div className="auth-input-wrapper">
                <span className="material-symbols-outlined auth-input-icon">lock</span>
                <input className="auth-input" id="password" placeholder="••••••••" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                <button className="auth-toggle-password" type="button" onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-error"><p>{error}</p></div>
            )}

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-footer-text">
            New to CodeCrime?{' '}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}