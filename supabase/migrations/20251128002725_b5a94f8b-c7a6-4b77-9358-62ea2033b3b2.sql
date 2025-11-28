-- Update function to auto-create profile and promote super admin
CREATE OR REPLACE FUNCTION public.handle_super_admin_promotion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile for the new user
  INSERT INTO public.profiles (id, nome_completo, created_at, updated_at)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'), NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  
  -- Auto-promote dandtecno@gmail.com to super_admin
  IF NEW.email = 'dandtecno@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'super_admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Insert profile for existing super admin user
INSERT INTO public.profiles (id, nome_completo, created_at, updated_at)
VALUES (
  '9664f4f9-85eb-48d4-ac13-819d6fd7d1cc',
  'Super Admin',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;