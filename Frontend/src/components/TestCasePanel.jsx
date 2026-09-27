import { useState } from 'react';
import './TestCasePanel.css';

export default function TestCasePanel({
  testCases = [],
  executionResults = null,
  output = '',
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState('cases'); // 'cases' | 'output'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const activeTestCase = testCases[selectedCaseIdx];
  const activeResult = executionResults?.[selectedCaseIdx];
  const passedCount = executionResults?.filter((result) => result.status === 'passed' || result.passed).length;
  const failedCount = executionResults ? executionResults.length - passedCount : 0;

  const formatVal = (v) => {
    if (v === undefined) return '';
    return typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v);
  };

  return (
    <div className="test-case-panel">
      <div className="tcp-header">
        <div className="tcp-tabs">
          <button
            type="button"
            className={`tcp-tab ${activeTab === 'cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              fact_check
            </span>
            Test Cases ({testCases.length})
          </button>
          {executionResults && (
            <span className="tcp-tab" aria-live="polite">
              Passed: {passedCount} · Failed: {failedCount}
            </span>
          )}
          <button
            type="button"
            className={`tcp-tab ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              terminal
            </span>
            Terminal / Output
          </button>
        </div>

        {loading && (
          <div style={{ fontSize: '12px', color: 'var(--color-primary-container)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined spin" style={{ fontSize: '14px' }}>
              sync
            </span>
            Executing code...
          </div>
        )}
      </div>

      <div className="tcp-content">
        {activeTab === 'cases' ? (
          <div>
            {/* Case selector pills */}
            <div className="case-selector">
              {testCases.map((tc, idx) => {
                const res = executionResults?.[idx];
                let statusClass = '';
                if (res) {
                  statusClass = res.status === 'passed' || res.passed ? 'passed' : 'failed';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`case-btn ${selectedCaseIdx === idx ? 'active' : ''} ${statusClass}`}
                    onClick={() => setSelectedCaseIdx(idx)}
                  >
                    {res ? (
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                        {res.status === 'passed' || res.passed ? 'check_circle' : 'cancel'}
                      </span>
                    ) : null}
                    Case {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Selected case IO */}
            {activeTestCase ? (
              <div className="case-io-group">
                <div className="case-io-block">
                  <span className="case-io-label">Input</span>
                  <div className="case-io-box">
                    {formatVal(activeTestCase.input)}
                  </div>
                </div>

                <div className="case-io-block">
                  <span className="case-io-label">Expected Output</span>
                  <div className="case-io-box">
                    {formatVal(activeTestCase.expectedOutput ?? activeTestCase.expected)}
                  </div>
                </div>

                {activeResult && (
                  <div className="case-io-block">
                    <span
                      className="case-io-label"
                      style={{
                        color: activeResult.status === 'passed' || activeResult.passed
                          ? 'var(--color-tertiary)'
                          : 'var(--color-error)',
                      }}
                    >
                      Your Output ({activeResult.status === 'error' ? 'ERROR' : (activeResult.status === 'passed' || activeResult.passed) ? 'PASSED' : 'FAILED'})
                    </span>
                    <div
                      className="case-io-box"
                      style={{
                        borderColor: activeResult.status === 'passed' || activeResult.passed
                          ? 'rgba(102, 250, 140, 0.4)'
                          : 'rgba(255, 180, 171, 0.4)',
                      }}
                    >
                      {activeResult.actualOutput !== undefined
                        ? formatVal(activeResult.actualOutput)
                        : activeResult.error || formatVal(activeResult.actual)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state">No test cases configured.</div>
            )}
          </div>
        ) : (
          /* Output Tab */
          <div className="terminal-output">
            {output || (
              <span style={{ color: 'var(--color-on-surface-variant)' }}>
                Click "Run Code" or "Submit Solution" to view terminal output.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
