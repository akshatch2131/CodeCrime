import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProblems, getMySubmissions } from '../services/api';
import './DashboardPage.css';

export default function DashboardPage() {
  const { profile, getToken } = useAuth();
  const [problems, setProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [probRes, subRes] = await Promise.allSettled([
          getProblems(getToken),
          getMySubmissions(getToken),
        ]);

        if (probRes.status === 'fulfilled' && probRes.value?.problems) {
          setProblems(probRes.value.problems);
        }

        if (subRes.status === 'fulfilled' && subRes.value?.submissions) {
          setSubmissions(subRes.value.submissions);
        }
      } catch (err) {
        console.error('Dashboard data load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [getToken]);

  const solvedCount = profile?.problems_solved || 0;
  const currentXp = profile?.xp || 0;
  const currentLevel = profile?.level || 'Rookie';

  // Recommend the first unsolved problem or the first problem
  const recommendedProblem =
    problems.find((p) => !p.is_solved) || problems[0] || null;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {profile?.name || 'Developer'}</h1>
          <p>Ready to inspect some code and track down bugs?</p>
        </div>
        <div className="dashboard-header-actions">
          <Link to="/problems" className="btn-primary">
            <span className="material-symbols-outlined">terminal</span>
            Practice Problems
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Bugs Fixed</span>
            <span className="material-symbols-outlined stat-card-icon success">
              check_circle
            </span>
          </div>
          <span className="stat-card-value">{solvedCount}</span>
          <span className="stat-card-subtitle">
            Out of {problems.length} available challenges
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Current Rank</span>
            <span className="material-symbols-outlined stat-card-icon">
              workspace_premium
            </span>
          </div>
          <span className="stat-card-value">{currentLevel}</span>
          <span className="stat-card-subtitle">Rank Tier</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Experience</span>
            <span className="material-symbols-outlined stat-card-icon">
              bolt
            </span>
          </div>
          <span className="stat-card-value">{currentXp} <span style={{ fontSize: '16px' }}>XP</span></span>
          <span className="stat-card-subtitle">Level up every 200 XP</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Submissions</span>
            <span className="material-symbols-outlined stat-card-icon accent">
              history
            </span>
          </div>
          <span className="stat-card-value">{submissions.length}</span>
          <span className="stat-card-subtitle">Recorded runs</span>
        </div>
      </div>

      {/* Hero Recommended Problem */}
      {recommendedProblem && (
        <div className="dashboard-hero-card">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                auto_awesome
              </span>
              Recommended Next Challenge
            </div>
            <h2 className="hero-title">{recommendedProblem.title}</h2>
            <p className="hero-desc">{recommendedProblem.description}</p>
            <div className="hero-meta">
              <span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  label
                </span>
                {recommendedProblem.category}
              </span>
              <span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  stars
                </span>
                +{recommendedProblem.xp_reward} XP
              </span>
              <span className={`badge-difficulty ${recommendedProblem.difficulty?.toLowerCase()}`}>
                {recommendedProblem.difficulty}
              </span>
            </div>
          </div>
          <div className="hero-actions">
            <Link
              to={`/workspace/${recommendedProblem.id}`}
              className="btn-primary"
            >
              <span className="material-symbols-outlined">bug_report</span>
              Start Debugging
            </Link>
            <Link
              to={`/problems/${recommendedProblem.id}`}
              className="btn-secondary"
            >
              View Briefing
            </Link>
          </div>
        </div>
      )}

      {/* Grid: Challenges + Recent Submissions */}
      <div className="dashboard-grid-2col">
        {/* Left: Problems list */}
        <div className="section-panel">
          <div className="section-header">
            <h2>Available Debugging Challenges</h2>
            <Link to="/problems" className="section-link">
              View All ({problems.length}) &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="empty-state">Loading problems...</div>
          ) : problems.length === 0 ? (
            <div className="empty-state">No challenges available yet.</div>
          ) : (
            problems.slice(0, 5).map((problem) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.id}`}
                className="problem-card-mini"
              >
                <div className="problem-mini-info">
                  <span className="problem-mini-title">{problem.title}</span>
                  <div className="problem-mini-badges">
                    <span className={`badge-difficulty ${problem.difficulty?.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                    <span className="badge-category">{problem.category}</span>
                  </div>
                </div>
                <div className="problem-mini-xp">
                  +{problem.xp_reward} XP
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Right: Recent Submissions */}
        <div className="section-panel">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
              Latest runs
            </span>
          </div>

          {loading ? (
            <div className="empty-state">Loading activity...</div>
          ) : submissions.length === 0 ? (
            <div className="empty-state">
              No submissions recorded yet. Pick a problem to get started!
            </div>
          ) : (
            submissions.slice(0, 5).map((sub) => (
              <div key={sub.id} className="submission-item-mini">
                <div className="submission-item-info">
                  <span className="submission-item-title">
                    {sub.problems?.title || 'Challenge Run'}
                  </span>
                  <span className="submission-item-time">
                    {new Date(sub.created_at).toLocaleDateString()} • {sub.passed_tests}/{sub.total_tests} tests
                  </span>
                </div>
                <span
                  className={`status-badge ${
                    sub.status === 'PASSED' ? 'passed' : 'failed'
                  }`}
                >
                  {sub.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}