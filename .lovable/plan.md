

## Unificar e-mail de boas-vindas com credenciais

### Problema atual

Existem dois e-mails diferentes sendo enviados:
1. **`process-sale-webhook`** — e-mail genérico com layout simples e URL errada (`appdriver-track.lovable.app`)
2. **`resend-welcome-email`** — e-mail profissional com mensagem do Andrews, YouTube, WhatsApp, etc.

O usuário quer que exista **apenas um e-mail**, usando o template profissional do `resend-welcome-email` com senha de 6 digitos.

### O que sera feito

**Arquivo: `supabase/functions/process-sale-webhook/index.ts`**

1. Substituir todo o HTML do e-mail (linhas 34-98) pelo template profissional do `resend-welcome-email`, que inclui:
   - Header verde com "🚗 Bateu A Meta"
   - Mensagem pessoal do Andrews Morais
   - Caixa de credenciais (email + senha de 6 digitos)
   - Link para video manual no YouTube
   - Botao "ENTRAR NO APLICATIVO AGORA" apontando para `bateuameta.com/auth`
   - Links uteis (site, WhatsApp, Instagram)
   - Assinatura "Tamo junto no trecho! 🚗"

2. Atualizar o assunto do e-mail para: `"Bem-vindo ao Bateu a Meta, [nome]! 🎉 Seus dados de acesso estão aqui"`

**Arquivo: `supabase/functions/resend-welcome-email/index.ts`**

3. Alterar a geração de senha de `crypto.randomUUID().slice(0, 12)` para senha numérica de 6 digitos (mesmo padrão do `process-sale-webhook`), e salvar no campo `provisional_password` do perfil

Ambas as Edge Functions serao reimplantadas apos as alterações.

