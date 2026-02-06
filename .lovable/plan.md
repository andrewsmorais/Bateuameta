
# Plano: Mover "Instalar App" para Configurações

## Objetivo
Remover a opção "Instalar App" do menu lateral (sidebar) e adicioná-la dentro da página de Configurações, entre os cards "Adicionar Veículo" e "Como Usar", como um card separado.

## Alterações

### 1. Arquivo: `src/pages/Configuracoes.tsx`

**Importações a adicionar:**
- `Download` do lucide-react
- `usePWAInstall` do hook existente
- `PWAInstallDialog` do componente existente

**Estado a adicionar:**
- `showInstallDialog` para controlar o modal de instalação PWA

**Novo Card a inserir entre "Adicionar Veículo" e "Como Usar":**

```text
┌─────────────────────────────────────┐
│  🚗  Adicionar Veículo              │  ← Card existente
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ⬇️  Instalar App                   │  ← NOVO Card
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ▶️  Como Usar                       │  ← Card existente
└─────────────────────────────────────┘
```

**Lógica do botão:**
- Usar o hook `usePWAInstall` para verificar se a instalação direta é possível
- Se `isInstallable` for verdadeiro, chamar `install()` diretamente
- Caso contrário, abrir o `PWAInstallDialog` com instruções específicas para cada dispositivo

### 2. Arquivo: `src/components/Layout.tsx`

**Remover do menu lateral (Desktop e Mobile):**
- Botão "Instalar App" com ícone `Download` (linhas 175-185 - Desktop)
- Botão "Instalar App" com ícone `Download` (linhas 232-245 - Mobile)

**Estado e função a remover (caso não sejam mais usados):**
- `showFloatingButton` state
- `handleInstallApp` function
- `handleCloseFloatingButton` function
- Componente `PWAFloatingButton`

**Importações a remover:**
- `PWAFloatingButton`
- `PWAInstallDialog` (se não for mais usado)

## Resultado Visual em Configurações

A página de Configurações terá a seguinte ordem de cards:

1. Foto de Perfil
2. Meus Dados
3. **Adicionar Veículo** (card separado)
4. **Instalar App** (NOVO - card separado)
5. **Como Usar** (card separado)
6. Políticas e Informações

## O que NÃO será alterado
- Funcionalidade de instalação PWA (mesmo comportamento)
- Visual do dialog de instalação
- Instruções específicas por dispositivo (iOS, Android, Desktop)
- Outros itens do menu lateral
