import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProblems } from '../services/api';
import './ProblemsPage.css';

export default function ProblemsPage() {
  const { getToken } = useAuth();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  useEffect(() => {
    async function fetchProblemsList() {
      try {
        setLoading(true);
        const data = await getProblems(getToken);
        if (data?.problems) {
          setProblems(data.problems);
        }
      } catch (err) {
        console.error('Failed to fetch problems:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProblemsList();
  }, [getToken]);

  const categories = useMemo(() => {
    const set = new Set(problems.map((p) => p.category).filter(Boolean));
    return Array.from(set);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        !search ||
        problem.title?.toLowerCase().includes(search.toLowerCase()) ||
        problem.description?.toLowerCase().includes(search.toLowerCase());

      const matchesDiff =
        difficultyFilter === 'ALL' ||
        problem.difficulty?.toUpperCase() === difficultyFilter;

      const matchesCat =
        categoryFilter === 'ALL' || problem.category === categoryFilter;

      return matchesSearch && matchesDiff && matchesCat;
    });
  }, [problems, search, difficultyFilter, categoryFilter]);

  return (
    <div className="problems-page">
      {/* Header */}
      <div className="problems-header">
        <div>
          <h1>Debugging Challenges</h1>
          <p>Inspect buggy code, diagnose the defect, and fix the solution.</p>
        </div>
        <div className="hero-badge">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            code
          </span>
          {problems.length} Available Challenges
        </div>
      </div>

      {/* Filter Bar */}
      <div className="problems-filter-bar">
        <div className="search-input-wrap">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search problems by name or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="empty-state">Loading challenges...</div>
      ) : error ? (
        <div className="empty-state" style={{ color: 'var(--color-error)' }}>
          {error}
        </div>
      ) : filteredProblems.length === 0 ? (
        <div className="empty-state">
          No challenges matched your search filters. Try resetting the filters.
        </div>
      ) : (
        <div className="problems-grid">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="problem-card">
              <div>
                <div className="problem-card-top">
                  <span className="problem-card-category">{problem.category}</span>
                  <span
                    className={`badge-difficulty ${problem.difficulty?.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <h3 className="problem-card-title">{problem.title}</h3>
                <p className="problem-card-desc">{problem.description}</p>
              </div>

              <div className="problem-card-footer">
                <div className="problem-xp-tag">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    stars
                  </span>
                  +{problem.xp_reward} XP
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={`/problems/${problem.id}`}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '13px' }}
                  >
                    Briefing
                  </Link>
                  <Link
                    to={`/workspace/${problem.id}`}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                  >
                    Debug
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
