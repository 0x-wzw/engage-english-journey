
-- 1. Create an enum for user roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create a user_roles table (never store roles on users/profiles table)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Example row insert for initial super admin (just make the first user who signs up a super_admin; in code, can prompt you later how/when to insert)

-- 4. Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Security Definer function for recursive-safe role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- 6. RLS policies

-- Super admins can see all user_roles
CREATE POLICY "Super admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

-- Each user can see their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (user_id = auth.uid());

-- Only super admins can assign roles (INSERT)
CREATE POLICY "Super admins can create roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- Only super admins can change/delete roles
CREATE POLICY "Super admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- (Optional, for future: create policies for admins, etc.)

