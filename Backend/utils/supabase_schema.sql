-- ==========================================
-- CODECRIME — Supabase Table Definitions
-- Run this SQL in the Supabase SQL Editor
-- ==========================================

-- Profiles table (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT,
  xp INTEGER DEFAULT 0,
  problems_solved INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Rookie',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role can insert profiles" ON profiles FOR INSERT WITH CHECK (true);

-- Problems table
CREATE TABLE IF NOT EXISTS problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_number INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  language TEXT DEFAULT 'javascript',
  difficulty TEXT NOT NULL DEFAULT 'Easy',
  category TEXT NOT NULL DEFAULT 'General',
  buggy_code TEXT NOT NULL,
  solution_code TEXT NOT NULL,
  function_name TEXT NOT NULL DEFAULT 'solution',
  test_cases JSONB NOT NULL DEFAULT '[]',
  hints JSONB DEFAULT '[]',
  xp_reward INTEGER DEFAULT 100,
  estimated_time INTEGER DEFAULT 10,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on problems
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;

-- Problems policies (everyone can read, only service role can write)
CREATE POLICY "Anyone can view published problems" ON problems FOR SELECT USING (is_published = true);
CREATE POLICY "Service role can manage problems" ON problems FOR ALL USING (true);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  submitted_code TEXT NOT NULL,
  tests_passed INTEGER DEFAULT 0,
  tests_total INTEGER DEFAULT 0,
  time_taken INTEGER DEFAULT 0,
  hints_used INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'failed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on submissions
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role can manage submissions" ON submissions FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_problems_problem_number ON problems(problem_number);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON profiles(xp DESC);
