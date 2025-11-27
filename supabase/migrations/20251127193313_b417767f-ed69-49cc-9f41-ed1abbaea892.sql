-- Add quantidade_corridas field to turnos_km table
ALTER TABLE turnos_km 
ADD COLUMN quantidade_corridas integer NOT NULL DEFAULT 0;