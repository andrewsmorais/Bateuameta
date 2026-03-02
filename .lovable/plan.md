

## Tornar links do footer da Landing Page clicáveis

### Situação atual
Os links "Política de Privacidade", "Termos de Uso" e "Política de Reembolso" no footer da Landing Page apontam para `href="#"` — não fazem nada.

### Plano

#### 1. Criar página `/politica-privacidade`
Nova página `src/pages/PoliticaPrivacidade.tsx` com conteúdo completo sobre:
- Coleta e tratamento de dados (LGPD)
- Direitos do usuário
- Cookies e rastreamento
- Contato

#### 2. Criar página `/termos-de-uso`
Nova página `src/pages/TermosDeUso.tsx` com:
- Condições gerais de uso do app
- Responsabilidades do usuário
- Limitações de responsabilidade
- Política de reembolso (7 dias)

#### 3. Registrar rotas no `App.tsx`
Adicionar as duas novas rotas públicas.

#### 4. Atualizar links no footer da `LandingPage.tsx`
Trocar `href="#"` por `<Link to="/politica-privacidade">` e `<Link to="/termos-de-uso">`. O link de "Política de Reembolso" pode apontar para a seção de reembolso dentro dos Termos de Uso.

### Arquivos
| Arquivo | Ação |
|---------|------|
| `src/pages/PoliticaPrivacidade.tsx` | **Novo** |
| `src/pages/TermosDeUso.tsx` | **Novo** |
| `src/App.tsx` | Adicionar 2 rotas |
| `src/pages/LandingPage.tsx` | Atualizar links do footer (linhas 1007-1011) |

