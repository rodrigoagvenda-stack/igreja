-- ══════════════════════════════════════════════════════════════
-- storage-setup.sql — Buckets e políticas para uploads
-- Executar no SQL Editor do Supabase UMA VEZ
-- ══════════════════════════════════════════════════════════════

-- Buckets públicos (leitura pública, upload apenas autenticado)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('arq-fotos',      'arq-fotos',      true, 5242880,   ARRAY['image/jpeg','image/png','image/webp']),
  ('arq-documentos', 'arq-documentos', true, 20971520,  ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- RLS: leitura pública
CREATE POLICY "public_read_fotos" ON storage.objects
  FOR SELECT USING (bucket_id = 'arq-fotos');

CREATE POLICY "public_read_documentos" ON storage.objects
  FOR SELECT USING (bucket_id = 'arq-documentos');

-- RLS: upload/update/delete apenas autenticado
CREATE POLICY "auth_insert_fotos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'arq-fotos' AND auth.role() = 'authenticated');

CREATE POLICY "auth_update_fotos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'arq-fotos' AND auth.role() = 'authenticated');

CREATE POLICY "auth_delete_fotos" ON storage.objects
  FOR DELETE USING (bucket_id = 'arq-fotos' AND auth.role() = 'authenticated');

CREATE POLICY "auth_insert_documentos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'arq-documentos' AND auth.role() = 'authenticated');

CREATE POLICY "auth_update_documentos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'arq-documentos' AND auth.role() = 'authenticated');

CREATE POLICY "auth_delete_documentos" ON storage.objects
  FOR DELETE USING (bucket_id = 'arq-documentos' AND auth.role() = 'authenticated');
