import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMySubmissions } from '../services/api';
import './ProfilePage.css';

export default function ProfilePage() {
  const { profile, user, getToken } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubs() {
      try {
        const res = await getMySubmissions(getToken);
        if (res?.submissions) {
          setSubmissions(res.submissions);
        }
      } catch (err) {
        console.error('Failed to load profile submissions:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSubs();
  }, [getToken]);

  const xp = profile?.xp || 0;
  const nextLevelXp = 200;
  const progressPercent = Math.min(100, Math.round(((xp % nextLevelXp) / nextLevelXp) * 100));

  return (
    <div className="profile-page">
      {/* Profile Hero */}
      <div className="profile-card-hero">
        <div className="profile-hero-avatar">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="profile-hero-info">
          <h1>{profile?.name || 'Developer'}</h1>
          <p>{user?.email || 'developer@codecrime.dev'}</p>
          <div className="profile-hero-badges">
            <span className="badge-category">{profile?.level || 'Rookie'}</span>
            <span className="problem-xp-tag">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                bolt
              </span>
              {xp} Total XP
            </span>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="profile-progress-box">
        <div className="profile-progress-labels">
          <span>Rank Progress to Next Tier</span>
          <span>{xp % nextLevelXp} / {nextLevelXp} XP ({progressPercent}%)</span>
        </div>
        <div className="profile-progress-bar-bg">
          <div
            className="profile-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Problems Fixed</span>
            <span className="material-symbols-outlined stat-card-icon success">
              check_circle
            </span>
          </div>
          <span className="stat-card-value">{profile?.problems_solved || 0}</span>
          <span className="stat-card-subtitle">Verified solutions</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Submissions</span>
            <span className="material-symbols-outlined stat-card-icon">
              send
            </span>
          </div>
          <span className="stat-card-value">{submissions.length}</span>
          <span className="stat-card-subtitle">Total attempts</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Member Since</span>
            <span className="material-symbols-outlined stat-card-icon accent">
              calendar_month
            </span>
          </div>
          <span className="stat-card-value" style={{ fontSize: '18px' }}>
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : 'Recent'}
          </span>
          <span className="stat-card-subtitle">Active developer</span>
        </div>
      </div>

      {/* Submission History */}
      <div className="section-panel">
        <div className="section-header">
          <h2>Submission History</h2>
          <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
            {submissions.length} records
          </span>
        </div>

        {loading ? (
          <div className="empty-state">Loading history...</div>
        ) : submissions.length === 0 ? (
          <div className="empty-state">
            No submissions yet. Go to Challenges to start solving!
          </div>
        ) : (
          <div className="profile-submissions-list">
            {submissions.map((sub) => (
              <div key={sub.id} className="submission-item-mini" style={{ padding: '12px var(--space-md)' }}>
                <div className="submission-item-info">
                  <span className="submission-item-title" style={{ fontSize: '15px' }}>
                    {sub.problems?.title || 'Debugging Challenge'}
                  </span>
                  <span className="submission-item-time">
                    {new Date(sub.created_at).toLocaleString()} • {sub.passed_tests}/{sub.total_tests} test cases passed
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    className={`status-badge ${
                      sub.status === 'PASSED' ? 'passed' : 'failed'
                    }`}
                  >
                    {sub.status}
                  </span>
                  <Link
                    to={`/result/${sub.id}`}
                    className="btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                  >
                    View Result
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
