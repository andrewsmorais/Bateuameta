UPDATE public.subscriptions SET status = 'active' WHERE user_id = 'f8d9723c-1955-494e-aebe-418e564f802d';

UPDATE public.profiles SET status = 'active', updated_at = now() WHERE id = 'f8d9723c-1955-494e-aebe-418e564f802d';