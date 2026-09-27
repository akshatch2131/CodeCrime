const API_BASE = "https://codecrime-o8om.onrender.com";

/**
 * Make an authenticated API request.
 * Automatically attaches the Supabase JWT token.
 */
async function apiRequest(endpoint, options = {}, getToken) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Attach auth token if available
  if (getToken) {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

// ===== Problems =====
export const getProblems = (getToken) =>
  apiRequest("/problems", {}, getToken);

export const getProblemById = (id) =>
  apiRequest(`/problems/${id}`);

// ===== Submissions =====
export const submitSolution = (body, getToken) =>
  apiRequest("/submissions", {
    method: "POST",
    body: JSON.stringify({ ...body, problem_id: body.problem_id || body.problemId }),
  }, getToken);

export const runCode = (body, getToken) =>
  apiRequest("/submissions/run", {
    method: "POST",
    body: JSON.stringify({ ...body, problem_id: body.problem_id || body.problemId }),
  }, getToken);

export const getMySubmissions = (getToken) =>
  apiRequest("/submissions/my", {}, getToken);

export const getSubmissionById = (id, getToken) =>
  apiRequest(`/submissions/${id}`, {}, getToken);

// ===== Hints =====
export const getHint = (body, getToken) =>
  apiRequest("/hints", {
    method: "POST",
    body: JSON.stringify(body),
  }, getToken);

// ===== Leaderboard =====
export const getLeaderboard = () =>
  apiRequest("/leaderboard");

// ===== Profile =====
export const getProfile = (getToken) =>
  apiRequest("/auth/me", {}, getToken);
