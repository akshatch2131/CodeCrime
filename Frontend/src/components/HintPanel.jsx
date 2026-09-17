import { useState } from 'react';
import { getHint } from '../services/api';
import './HintPanel.css';

export default function HintPanel({
  isOpen,
  onClose,
  problemId,
  currentCode,
  getToken,
}) {
  const [hints, setHints] = useState([]);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleRequestHint = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getHint(
        {
          problemId,
          userCode: currentCode,
          hintLevel: level,
        },
        getToken
      );

      if (res?.hint) {
        setHints((prev) => [
          ...prev,
          {
            level,
            text: res.hint,
            title: `Hint Level ${level}: ${
              level === 1
                ? 'High-level Direction'
                : level === 2
                ? 'Logic & Condition Clue'
                : 'Detailed Root Cause Explanation'
            }`,
          },
        ]);
        setLevel((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Hint error:', err);
      setError(err.message || 'Failed to generate hint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hint-panel-overlay" onClick={onClose}>
      <div
        className="hint-panel-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hint-panel-header">
          <h3>
            <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>
              psychology
            </span>
            AI Debugging Assistant
          </h3>
          <button
            type="button"
            className="hint-panel-close"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="hint-panel-body">
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', margin: 0 }}>
            Stuck on this bug? Ask our AI assistant for progressive hints. Each hint gives a little more information without spoiling the solution directly.
          </p>

          {hints.map((hint, idx) => (
            <div key={idx} className="hint-card">
              <span className="hint-card-title">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  lightbulb
                </span>
                {hint.title}
              </span>
              <p className="hint-card-text">{hint.text}</p>
            </div>
          ))}

          {error && (
            <div className="hint-card" style={{ borderColor: 'var(--color-error)' }}>
              <span className="hint-card-title" style={{ color: 'var(--color-error)' }}>
                Error
              </span>
              <p className="hint-card-text">{error}</p>
            </div>
          )}

          <div className="hint-action-box">
            {level <= 3 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleRequestHint}
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span className="material-symbols-outlined">
                  {loading ? 'sync' : 'auto_awesome'}
                </span>
                {loading
                  ? 'Analyzing your code...'
                  : `Request Level ${level} Hint`}
              </button>
            ) : (
              <div className="hint-card">
                <span className="hint-card-title">All Hints Unlocked</span>
                <p className="hint-card-text">
                  You have accessed all 3 hint levels. Review the clues above and test your solution!
                </p>
              </div>
            )}
            <span className="hint-cost-note">
              Using hints encourages learning but may slightly reduce XP rewards.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
