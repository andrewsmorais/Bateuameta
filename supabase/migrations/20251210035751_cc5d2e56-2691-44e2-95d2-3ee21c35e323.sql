-- Add FORCE ROW LEVEL SECURITY to all sensitive tables
-- This ensures RLS policies apply even for table owners

-- Profiles table (already done, but ensuring)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.profiles IS 'Contains PII (nome_completo, telefone, CPF). RLS enabled with FORCE. Anonymous access blocked.';

-- Financial tables
ALTER TABLE public.ganhos_despesas FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ganhos_despesas IS 'Financial transactions. RLS enabled with FORCE. Anonymous access blocked via auth.uid() checks.';

ALTER TABLE public.turnos_km FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.turnos_km IS 'Shift records with earnings. RLS enabled with FORCE. Anonymous access blocked.';

ALTER TABLE public.manutencoes FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.manutencoes IS 'Vehicle maintenance records. RLS enabled with FORCE. Anonymous access blocked.';

ALTER TABLE public.turno_fontes_ganho FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.turno_fontes_ganho IS 'Shift income sources. RLS enabled with FORCE. Anonymous access blocked.';

ALTER TABLE public.metas FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.metas IS 'User goals. RLS enabled with FORCE. Anonymous access blocked.';

ALTER TABLE public.veiculos FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.veiculos IS 'User vehicles. RLS enabled with FORCE. Anonymous access blocked.';

-- Subscription and payment tables
ALTER TABLE public.subscriptions FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.subscriptions IS 'User subscriptions. RLS enabled with FORCE. Anonymous access blocked.';

ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.user_roles IS 'User roles. RLS enabled with FORCE. Super admin only access.';

ALTER TABLE public.webhook_config FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.webhook_config IS 'Webhook configurations. RLS enabled with FORCE. Super admin only.';

ALTER TABLE public.plans FORCE ROW LEVEL SECURITY;
COMMENT ON TABLE public.plans IS 'Available plans. Public read, super admin write.';