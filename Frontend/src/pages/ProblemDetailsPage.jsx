import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblemById } from '../services/api';
import './ProblemDetailsPage.css';

export default function ProblemDetailsPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProblem() {
      try {
        setLoading(true);
        const data = await getProblemById(id);
        if (data?.problem) {
          setProblem(data.problem);
        } else {
          setError('Problem not found');
        }
      } catch (err) {
        console.error('Error loading problem details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="problem-details-page">
        <div className="empty-state">Loading problem details...</div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="problem-details-page">
        <div className="empty-state" style={{ color: 'var(--color-error)' }}>
          {error || 'Problem not found.'}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/problems" className="btn-secondary">
            &larr; Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="problem-details-page">
      {/* Breadcrumb */}
      <div className="details-breadcrumb">
        <Link to="/problems">Challenges</Link>
        <span>/</span>
        <span>{problem.title}</span>
      </div>

      <div className="details-hero">
        {/* Title & Metadata */}
        <div className="details-title-row">
          <div>
            <h1>{problem.title}</h1>
            <div className="details-meta-badges">
              <span className={`badge-difficulty ${problem.difficulty?.toLowerCase()}`}>
                {problem.difficulty}
              </span>
              <span className="badge-category">{problem.category}</span>
              <span className="problem-xp-tag">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  stars
                </span>
                +{problem.xp_reward} XP
              </span>
            </div>
          </div>
          <div>
            <Link to={`/workspace/${problem.id}`} className="btn-primary">
              <span className="material-symbols-outlined">terminal</span>
              Open Debugging Workspace
            </Link>
          </div>
        </div>

        {/* Description / Defect briefing */}
        <div className="details-description-box">
          <div className="details-section-title">
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-primary-container)' }}>
              description
            </span>
            Problem Description & Objective
          </div>
          <p>{problem.description}</p>
        </div>

        {/* Buggy Code Preview */}
        <div>
          <div className="details-section-title">
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ffb4ab' }}>
              bug_report
            </span>
            Defective Implementation Preview
          </div>
          <div className="code-preview-block">
            <div className="code-preview-header">
              <span>solution.js</span>
              <span>JavaScript (Node.js)</span>
            </div>
            <pre className="code-preview-content">
              <code>{problem.buggy_code}</code>
            </pre>
          </div>
        </div>

        {/* Example Test Cases */}
        {problem.test_cases && problem.test_cases.length > 0 && (
          <div>
            <div className="details-section-title">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-tertiary)' }}>
                fact_check
              </span>
              Example Test Cases
            </div>
            <div className="examples-grid">
              {problem.test_cases.slice(0, 3).map((tc, idx) => (
                <div key={idx} className="example-card">
                  <h4>Example {idx + 1}</h4>
                  <div className="example-row">
                    <span className="example-label">Input</span>
                    <span className="example-val">
                      {typeof tc.input === 'object' ? JSON.stringify(tc.input) : String(tc.input)}
                    </span>
                  </div>
                  <div className="example-row">
                    <span className="example-label">Expected Output</span>
                    <span className="example-val">
                      {typeof tc.expected === 'object' ? JSON.stringify(tc.expected) : String(tc.expected)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="details-actions-bar">
          <Link to="/problems" className="btn-secondary">
            &larr; Back to Challenges
          </Link>
          <Link to={`/workspace/${problem.id}`} className="btn-primary">
            <span className="material-symbols-outlined">terminal</span>
            Start Debugging
          </Link>
        </div>
      </div>
    </div>
  );
}
