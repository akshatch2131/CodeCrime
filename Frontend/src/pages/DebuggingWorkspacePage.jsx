import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProblemById, runCode, submitSolution } from '../services/api';
import MonacoEditor from '../components/MonacoEditor';
import TestCasePanel from '../components/TestCasePanel';
import HintPanel from '../components/HintPanel';
import './DebuggingWorkspacePage.css';

export default function DebuggingWorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken, refreshProfile } = useAuth();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Execution state
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [executionResults, setExecutionResults] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState('');

  // AI Hint Drawer state
  const [isHintOpen, setIsHintOpen] = useState(false);

  useEffect(() => {
    async function loadProblem() {
      try {
        setLoading(true);
        const data = await getProblemById(id);
        if (data?.problem) {
          setProblem(data.problem);
          setCode(data.problem.buggy_code || '');
        } else {
          setError('Problem not found');
        }
      } catch (err) {
        console.error('Workspace load error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProblem();
  }, [id]);

  const handleResetCode = () => {
    if (problem?.buggy_code) {
      setCode(problem.buggy_code);
      setExecutionResults(null);
      setTerminalOutput('Code reset to original defect.');
    }
  };

  const handleRunCode = async () => {
    if (running || submitting) return;
    try {
      setRunning(true);
      setTerminalOutput('Running test cases...');
      const res = await runCode(
        {
          problemId: id,
          code,
        },
        getToken
      );

      if (res) {
        setExecutionResults(res.results || []);
        const passedCount = res.results?.filter((r) => r.passed).length || 0;
        const totalCount = res.results?.length || 0;
        setTerminalOutput(
          `Execution Finished.\nResult: ${passedCount}/${totalCount} test cases passed.\n` +
            (res.output ? `\nConsole output:\n${res.output}` : '')
        );
      }
    } catch (err) {
      console.error('Run code error:', err);
      setTerminalOutput(`Execution Error:\n${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (running || submitting) return;
    try {
      setSubmitting(true);
      setTerminalOutput('Evaluating solution against test suite...');
      const res = await submitSolution(
        {
          problemId: id,
          code,
        },
        getToken
      );

      if (res?.submission) {
        // Refresh profile to reflect any updated XP or problems_solved
        await refreshProfile();
        // Navigate to the resolution / results page with submission details
        navigate(`/result/${res.submission.id}`);
      } else {
        setTerminalOutput('Submission complete, but no submission ID returned.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setTerminalOutput(`Submission Error:\n${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="workspace-page" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="empty-state">Opening workspace...</div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="workspace-page" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="empty-state" style={{ color: 'var(--color-error)' }}>
          {error || 'Failed to load workspace.'}
        </div>
        <Link to="/problems" className="btn-secondary">
          &larr; Back to Challenges
        </Link>
      </div>
    );
  }

  return (
    <div className="workspace-page">
      {/* Top Navbar */}
      <header className="workspace-navbar">
        <div className="workspace-nav-left">
          <Link to={`/problems/${problem.id}`} className="workspace-back-btn">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_back
            </span>
            Back
          </Link>
          <span className="workspace-problem-title">{problem.title}</span>
          <span className={`badge-difficulty ${problem.difficulty?.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>

        <div className="workspace-nav-right">
          <button
            type="button"
            className="btn-hint"
            onClick={() => setIsHintOpen(true)}
            title="Ask AI for a hint"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              psychology
            </span>
            AI Hint
          </button>

          <button
            type="button"
            className="btn-run"
            onClick={handleRunCode}
            disabled={running || submitting}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              {running ? 'sync' : 'play_arrow'}
            </span>
            {running ? 'Running...' : 'Run Code'}
          </button>

          <button
            type="button"
            className="btn-submit"
            onClick={handleSubmitSolution}
            disabled={running || submitting}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              {submitting ? 'sync' : 'send'}
            </span>
            {submitting ? 'Submitting...' : 'Submit Solution'}
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="workspace-body">
        {/* Left Pane: Problem Description */}
        <div className="workspace-left-pane">
          <div className="workspace-desc-header">
            <h2>{problem.title}</h2>
            <div className="workspace-desc-badges">
              <span className="badge-category">{problem.category}</span>
              <span className="problem-xp-tag">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                  stars
                </span>
                +{problem.xp_reward} XP
              </span>
            </div>
          </div>

          <div className="workspace-desc-content">
            <h3>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary-container)' }}>
                description
              </span>
              Description
            </h3>
            <p>{problem.description}</p>

            {problem.test_cases && problem.test_cases.length > 0 && (
              <>
                <h3>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-tertiary)' }}>
                    rule
                  </span>
                  Expected Behavior
                </h3>
                <p>
                  Review the test cases below. Your function must return the expected outputs for all test inputs without throwing unhandled exceptions.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Pane: Monaco Editor + Test Cases Panel */}
        <div className="workspace-right-pane">
          <div className="workspace-editor-section">
            <MonacoEditor
              code={code}
              onChange={(newVal) => setCode(newVal || '')}
              onReset={handleResetCode}
              language="javascript"
            />
          </div>

          <div className="workspace-tests-section">
            <TestCasePanel
              testCases={problem.test_cases || []}
              executionResults={executionResults}
              output={terminalOutput}
              loading={running || submitting}
            />
          </div>
        </div>
      </div>

      {/* AI Hint Drawer */}
      <HintPanel
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
        problemId={problem.id}
        currentCode={code}
        getToken={getToken}
      />
    </div>
  );
}
