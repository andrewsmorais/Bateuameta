-- Add admin_notes field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS admin_notes text;

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.admin_notes IS 'Notes from admin about this user';