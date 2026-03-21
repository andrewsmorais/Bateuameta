
## Corrigir fluxo de compra mensal para garantir envio de acesso

### O que encontrei
Hoje existem **dois fluxos diferentes** no projeto, e eles estão desalinhados:

1. **Fluxo antigo no webhook da Cakto**
   - `supabase/functions/cakto-webhook/index.ts` cria o usuário diretamente no Auth
   - cria profile, subscription e role premium
   - tenta enviar o e-mail com senha automaticamente

2. **Fluxo novo da tela `/pagamento-sucesso`**
   - espera um registro em `pending_registrations`
   - coleta nome, CPF, telefone e senha escolhida pelo cliente
   - só então cria a conta via `complete-registration`

### Problema principal
O webhook atual **não grava nada em `pending_registrations`**. Eu confirmei que a tabela está vazia.

Isso causa dois problemas:
- a tela `/pagamento-sucesso` não tem dados para concluir cadastro
- o sistema fica dependente do envio imediato do e-mail com senha; se o e-mail falhar, o comprador fica sem acesso

### Problema adicional importante
A rota `/pagamento-sucesso` está protegida por `ProtectedRoute`, então um comprador novo sem login tende a ser redirecionado para `/auth`. Isso quebra o fluxo pós-compra.

## Plano de implementação

### 1) Unificar o fluxo pós-venda
Vou ajustar o sistema para trabalhar de forma consistente com **um único fluxo**:

- no webhook da Cakto, ao aprovar compra:
  - identificar corretamente mensal/anual
  - criar/atualizar `pending_registrations`
  - **não depender só do e-mail com senha**
- o comprador será levado para `/pagamento-sucesso?session_id=...`
- nessa página ele completa o cadastro e define a própria senha
- `complete-registration` cria a conta, assinatura e role premium

Isso elimina a dependência de “e-mail com senha” para novos compradores.

### 2) Liberar a página de conclusão de cadastro
Vou alterar o roteamento para que `/pagamento-sucesso` seja acessível sem login prévio.

Assim o comprador poderá:
- abrir o link pós-pagamento
- ver o e-mail preenchido
- cadastrar nome, CPF, telefone e senha
- entrar automaticamente no app

### 3) Ajustar o webhook da Cakto para o fluxo correto
No `cakto-webhook` vou:

- manter a detecção de plano mensal/anual
- deixar de criar usuário diretamente para novos compradores
- criar um registro em `pending_registrations` com:
  - email
  - session_id/token do fluxo
  - plan_type
  - status pending
  - expires_at
- preservar tratamento de renovação para clientes que já existem

### 4) Garantir comportamento correto para novos clientes vs clientes existentes
Vou separar a lógica assim:

- **novo comprador**
  - cria `pending_registrations`
  - segue para cadastro final em `/pagamento-sucesso`
  - sem necessidade de receber senha por e-mail

- **cliente já existente**
  - mantém atualização/renovação da assinatura
  - mantém e-mail de renovação
  - não cria novo cadastro pendente

### 5) Tornar o fluxo resiliente quando o e-mail falhar
Mesmo que o envio de e-mail falhe:
- o comprador ainda conseguirá concluir o cadastro pela página de sucesso
- o acesso não ficará bloqueado por dependência do Brevo

Se fizer sentido, também posso deixar um fallback no painel admin para:
- reenviar credenciais
- gerar nova senha rapidamente

### 6) Validar o plano mensal em todo o fluxo
Vou conferir e alinhar:
- `cakto-webhook`
- `pending_registrations.plan_type`
- `complete-registration`
- criação da assinatura com 1 mês para mensal
- renovação com label/preço corretos

## Resultado esperado
Depois da correção, quando alguém comprar o plano mensal de R$ 12,90:

- a compra será reconhecida como mensal
- o comprador conseguirá concluir o cadastro normalmente
- a conta será criada com assinatura mensal ativa
- o login funcionará imediatamente
- o processo não ficará quebrado se o e-mail não chegar

## Detalhes técnicos
- Arquivos principais envolvidos:
  - `supabase/functions/cakto-webhook/index.ts`
  - `supabase/functions/get-pending-registration/index.ts`
  - `supabase/functions/complete-registration/index.ts`
  - `src/pages/PagamentoSucesso.tsx`
  - `src/App.tsx`

- Evidências encontradas:
  - `pending_registrations` está vazia
  - `/pagamento-sucesso` exige autenticação hoje
  - o webhook atual cria usuário diretamente e só envia e-mail para novos usuários
  - isso conflita com o fluxo de cadastro final já existente no app
