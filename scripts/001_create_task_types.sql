-- Create task_types table
CREATE TABLE IF NOT EXISTS public.task_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#f9d022',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.task_types ENABLE ROW LEVEL SECURITY;

-- Create policies for task_types (public read, but could be user-specific later)
CREATE POLICY "task_types_select_all" ON public.task_types FOR SELECT USING (true);
CREATE POLICY "task_types_insert_all" ON public.task_types FOR INSERT WITH CHECK (true);
CREATE POLICY "task_types_update_all" ON public.task_types FOR UPDATE USING (true);
CREATE POLICY "task_types_delete_all" ON public.task_types FOR DELETE USING (true);

-- Insert default task types
INSERT INTO public.task_types (name, description, color) VALUES
  ('Bug Fix', 'Issues and bug reports', '#ef4444'),
  ('Feature', 'New feature development', '#22c55e'),
  ('Documentation', 'Documentation updates', '#3b82f6'),
  ('Meeting', 'Meetings and calls', '#f59e0b'),
  ('Research', 'Research and investigation', '#8b5cf6')
ON CONFLICT DO NOTHING;
