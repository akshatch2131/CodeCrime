import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLeaderboard } from '../services/api';
import './LeaderboardPage.css';

export default function LeaderboardPage() {
  const { profile } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        if (data?.leaderboard) {
          setLeaders(data.leaderboard);
        }
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  const top3 = [leaders[1], leaders[0], leaders[2]].filter(Boolean);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <div>
          <h1>Developer Leaderboard</h1>
          <p>Top engineers ranked by bugs resolved and total experience points.</p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading rankings...</div>
      ) : error ? (
        <div className="empty-state" style={{ color: 'var(--color-error)' }}>
          {error}
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {leaders.length >= 3 && (
            <div className="podium-container">
              {/* 2nd place */}
              {leaders[1] && (
                <div className="podium-card second">
                  <div className="podium-rank-badge">2</div>
                  <div className="podium-avatar">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <span className="podium-name">{leaders[1].name}</span>
                  <span className="badge-category">{leaders[1].level || 'Rookie'}</span>
                  <span className="podium-xp">{leaders[1].xp} XP</span>
                </div>
              )}

              {/* 1st place */}
              {leaders[0] && (
                <div className="podium-card first">
                  <div className="podium-rank-badge">1</div>
                  <div className="podium-avatar">
                    <span className="material-symbols-outlined">workspace_premium</span>
                  </div>
                  <span className="podium-name">{leaders[0].name}</span>
                  <span className="badge-category">{leaders[0].level || 'Master'}</span>
                  <span className="podium-xp">{leaders[0].xp} XP</span>
                </div>
              )}

              {/* 3rd place */}
              {leaders[2] && (
                <div className="podium-card third">
                  <div className="podium-rank-badge">3</div>
                  <div className="podium-avatar">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <span className="podium-name">{leaders[2].name}</span>
                  <span className="badge-category">{leaders[2].level || 'Rookie'}</span>
                  <span className="podium-xp">{leaders[2].xp} XP</span>
                </div>
              )}
            </div>
          )}

          {/* Full Rankings Table */}
          <div className="leaderboard-table-wrap">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Rank</th>
                  <th>Developer</th>
                  <th>Tier / Level</th>
                  <th>Bugs Solved</th>
                  <th style={{ textAlign: 'right' }}>Total XP</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((u, idx) => {
                  const isCurrent = profile?.id && u.id === profile.id;
                  return (
                    <tr key={u.id || idx} className={isCurrent ? 'current-user' : ''}>
                      <td className="leaderboard-rank">#{idx + 1}</td>
                      <td>
                        <div className="leaderboard-user-cell">
                          <div className="leaderboard-table-avatar">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                              person
                            </span>
                          </div>
                          <div>
                            <span style={{ fontWeight: 600 }}>{u.name}</span>
                            {isCurrent && (
                              <span
                                style={{
                                  marginLeft: '8px',
                                  fontSize: '11px',
                                  color: 'var(--color-primary-container)',
                                }}
                              >
                                (You)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge-category">{u.level || 'Rookie'}</span>
                      </td>
                      <td>{u.problems_solved || 0}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontWeight: 700, color: 'var(--color-primary-container)' }}>
                        {u.xp} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
