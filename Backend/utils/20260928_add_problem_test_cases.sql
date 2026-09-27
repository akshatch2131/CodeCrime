-- Add debugging execution metadata without changing existing problem IDs/data.
-- Safe to apply when either column is already present.
ALTER TABLE public.problems
  ADD COLUMN IF NOT EXISTS function_name TEXT DEFAULT 'solution';

ALTER TABLE public.problems
  ADD COLUMN IF NOT EXISTS test_cases JSONB DEFAULT '[]'::jsonb;

UPDATE public.problems
SET function_name = COALESCE(NULLIF(function_name, ''), 'solution'),
    test_cases = COALESCE(test_cases, '[]'::jsonb)
WHERE function_name IS NULL OR function_name = '' OR test_cases IS NULL;
