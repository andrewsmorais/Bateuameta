-- 1. Remover planos legados não utilizados (Basic, Premium, Enterprise)
DELETE FROM public.plans
WHERE id IN (
  '987885e3-9fb0-48a9-a36f-511259ef7ee8', -- Basic
  'efa1af67-4ef5-48ac-ad1d-4219107ecdfd', -- Premium
  '9d69ce92-748c-461c-8eb6-af33ff3e69ec'  -- Enterprise
)
AND NOT EXISTS (
  SELECT 1 FROM public.subscriptions s WHERE s.plan_id = plans.id
);

-- 2. Sincronizar profiles.subscription_id com a assinatura real do usuário
UPDATE public.profiles p
SET subscription_id = s.id, updated_at = now()
FROM public.subscriptions s
WHERE s.user_id = p.id
  AND (p.subscription_id IS DISTINCT FROM s.id);

-- 3. Para usuários com assinatura ATIVA E NÃO VENCIDA (paga): garantir papel premium e remover papel free
INSERT INTO public.user_roles (user_id, role)
SELECT s.user_id, 'premium'::app_role
FROM public.subscriptions s
JOIN public.plans pl ON pl.id = s.plan_id
WHERE s.status = 'active'
  AND pl.price > 0
  AND (s.expires_at IS NULL OR s.expires_at > now())
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = s.user_id AND ur.role = 'premium'
  )
ON CONFLICT (user_id, role) DO NOTHING;

DELETE FROM public.user_roles ur
WHERE ur.role = 'free'
  AND EXISTS (
    SELECT 1 FROM public.subscriptions s
    JOIN public.plans pl ON pl.id = s.plan_id
    WHERE s.user_id = ur.user_id
      AND s.status = 'active'
      AND pl.price > 0
      AND (s.expires_at IS NULL OR s.expires_at > now())
  );

-- 4. Para usuários SEM assinatura ativa e válida E que NÃO são super_admin: garantir papel free e remover papel premium
INSERT INTO public.user_roles (user_id, role)
SELECT p.id, 'free'::app_role
FROM public.profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = p.id AND ur.role = 'super_admin'
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.subscriptions s
    JOIN public.plans pl ON pl.id = s.plan_id
    WHERE s.user_id = p.id
      AND s.status = 'active'
      AND pl.price > 0
      AND (s.expires_at IS NULL OR s.expires_at > now())
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = p.id AND ur.role = 'free'
  )
ON CONFLICT (user_id, role) DO NOTHING;

DELETE FROM public.user_roles ur
WHERE ur.role = 'premium'
  AND NOT EXISTS (
    SELECT 1 FROM public.subscriptions s
    JOIN public.plans pl ON pl.id = s.plan_id
    WHERE s.user_id = ur.user_id
      AND s.status = 'active'
      AND pl.price > 0
      AND (s.expires_at IS NULL OR s.expires_at > now())
  );