

## Adicionar filtros avançados ao Gerenciamento de Usuários

### O que será feito

Adicionar uma barra de filtros abaixo da busca existente com:

1. **Filtro por Data de Cadastro** — Campos "De" e "Até" para filtrar por `created_at`
2. **Filtro por Plano** — Select com opções: Todos, Free, Mensal, Anual
3. **Ordenação** — Select com opções: Mais recente, Mais antigo, Nome A-Z, Nome Z-A

### Detalhes técnicos

**Arquivo modificado:** `src/components/superadmin/UsersManagement.tsx`

- Adicionar states: `planFilter`, `sortOrder`, `dateFrom`, `dateTo`
- O `UserData` já possui `created_at` (vindo do edge function `get-admin-users`) — será adicionado à interface se necessário
- A lógica de `filteredUsers` (linha 298) será expandida para aplicar os filtros de plano e data, e depois ordenar conforme selecionado
- Os filtros ficarão em uma row flexbox abaixo do campo de busca existente, usando os componentes `Select` e `Input type="date"` já existentes no projeto
- O edge function `get-admin-users` já retorna `created_at` nos dados do usuário

**Layout dos filtros:**
```text
[🔍 Buscar por nome, email...              ]
[Plano: Todos ▼] [Ordenar: Mais recente ▼] [De: __/__/____] [Até: __/__/____]
```

