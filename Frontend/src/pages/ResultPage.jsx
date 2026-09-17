import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubmissionById } from '../services/api';
import './ResultPage.css';

export default function ResultPage() {
  const { submissionId } = useParams();
  const { getToken } = useAuth();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSubmission() {
      try {
        setLoading(true);
        const data = await getSubmissionById(submissionId, getToken);
        if (data?.submission) {
          setSubmission(data.submission);
        } else {
          setError('Submission record not found.');
        }
      } catch (err) {
        console.error('Submission load error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadSubmission();
  }, [submissionId, getToken]);

  if (loading) {
    return (
      <div className="result-page">
        <div className="empty-state">Loading submission results...</div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="result-page">
        <div className="empty-state" style={{ color: 'var(--color-error)' }}>
          {error || 'Submission not found.'}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/dashboard" className="btn-secondary">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isPassed = submission.status === 'PASSED';
  const problem = submission.problems;

  return (
    <div className="result-page">
      {/* Banner */}
      <div className={`result-banner ${isPassed ? 'passed' : 'failed'}`}>
        <div className="result-banner-left">
          <div className="result-icon-circle">
            <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
              {isPassed ? 'verified' : 'cancel'}
            </span>
          </div>
          <div className="result-banner-titles">
            <h1>{isPassed ? 'Defect Resolved!' : 'Tests Failed'}</h1>
            <p>
              {isPassed
                ? 'Your patch passed all test cases successfully.'
                : 'Some test cases did not pass. Check the diagnostics below.'}
            </p>
          </div>
        </div>

        {isPassed && (
          <div className="problem-xp-tag" style={{ fontSize: '18px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              stars
            </span>
            +{problem?.xp_reward || 50} XP Awarded
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="result-metrics-grid">
        <div className="result-metric-card">
          <span className="result-metric-label">Challenge</span>
          <span className="result-metric-val" style={{ fontSize: '18px' }}>
            {problem?.title || 'Debugging Challenge'}
          </span>
        </div>

        <div className="result-metric-card">
          <span className="result-metric-label">Test Cases</span>
          <span
            className="result-metric-val"
            style={{
              color: isPassed ? 'var(--color-tertiary)' : 'var(--color-error)',
            }}
          >
            {submission.passed_tests} / {submission.total_tests} Passed
          </span>
        </div>

        <div className="result-metric-card">
          <span className="result-metric-label">Execution Time</span>
          <span className="result-metric-val">
            {submission.execution_time_ms ? `${submission.execution_time_ms}ms` : '< 50ms'}
          </span>
        </div>

        <div className="result-metric-card">
          <span className="result-metric-label">Difficulty</span>
          <span className="result-metric-val" style={{ fontSize: '18px' }}>
            {problem?.difficulty || 'Standard'}
          </span>
        </div>
      </div>

      {/* AI Feedback */}
      {submission.ai_feedback && (
        <div className="ai-feedback-box">
          <div className="ai-feedback-header">
            <span className="material-symbols-outlined">psychology</span>
            <span>AI Code Review & Analysis</span>
          </div>
          <div className="ai-feedback-body">
            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {submission.ai_feedback}
            </p>
          </div>
        </div>
      )}

      {/* Submitted Code Preview */}
      <div className="code-preview-block">
        <div className="code-preview-header">
          <span>Submitted Solution</span>
          <span>JavaScript</span>
        </div>
        <pre className="code-preview-content">
          <code>{submission.code}</code>
        </pre>
      </div>

      {/* Action buttons */}
      <div className="result-actions">
        <Link to="/problems" className="btn-secondary">
          Challenges List
        </Link>
        {problem && (
          <Link to={`/workspace/${problem.id}`} className="btn-secondary">
            {isPassed ? 'Review Code' : 'Try Again'}
          </Link>
        )}
        <Link to="/dashboard" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
