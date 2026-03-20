

## Adicionar Plano Mensal ao Gerenciamento de Usuários

### Situação Atual

- A tabela `plans` tem um plano "mensal" (ID: `49a734d8-af86-4a0b-accf-755d947cc1d8`) mas com preço R$ 19,90 (deveria ser R$ 12,90)
- O painel Super Admin só mostra "Anual" ou "Free" nos selects e na tabela de usuários
- O cliente Luiz Carlos comprou mensal mas foi registrado como anual

### Alterações

1. **Atualizar preço do plano mensal** na tabela `plans`: de R$ 19,90 para R$ 12,90

2. **Corrigir assinatura do Luiz Carlos** (`luis.1948caca@gmail.com`): trocar para o plano mensal com expiração de 1 mês

3. **`src/components/superadmin/UsersManagement.tsx`** — 4 pontos de alteração:

   - **Select "Adicionar Usuário"** (linha ~496): adicionar opção "Mensal R$ 12,90" com o UUID do plano mensal
   
   - **Badge da coluna Plano na tabela** (linha ~574): atualizar lógica para mostrar "Anual", "Mensal" ou "Free" (atualmente só compara `planPrice === 97.9`)
   
   - **CSV export** (linha ~362): atualizar label do plano para incluir "Mensal R$ 12,90"

### Detalhes Técnicos

- UUID do plano mensal: `49a734d8-af86-4a0b-accf-755d947cc1d8`
- UUID do plano anual: `08033a83-5a65-4248-ae25-89e8bc35fe04`
- UUID do plano free: `7ce2d64b-e97a-429e-9448-3af009895d70`
- O select de "Editar Usuário" já usa dados dinâmicos da tabela `plans` (linhas 718-722), então não precisa de alteração
- A lógica do badge será: preço >= 90 → "Anual", preço > 0 → "Mensal", senão → "Free"

