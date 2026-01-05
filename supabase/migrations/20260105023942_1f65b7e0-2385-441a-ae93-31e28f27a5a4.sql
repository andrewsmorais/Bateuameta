-- Adicionar constraint UNIQUE para (email, plan_type) na tabela abandoned_checkouts
-- Isso permite upsert correto e evita duplicatas
ALTER TABLE public.abandoned_checkouts 
ADD CONSTRAINT abandoned_checkouts_email_plan_unique UNIQUE (email, plan_type);