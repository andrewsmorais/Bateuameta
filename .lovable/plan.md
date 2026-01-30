

# Plano: Aumentar Tamanho das Imagens de Recursos no Desktop

## Objetivo
Aumentar o tamanho das 4 imagens de funcionalidades do app (Dashboard, Metas, Ganhos & Despesas, Relatórios) quando visualizadas no computador.

## Situação Atual
- Container: `max-w-5xl` (1024px)
- Grid: 4 colunas no desktop (`md:grid-cols-4`)
- Resultado: cada imagem fica com ~230px de largura

## Solução Proposta

### Arquivo: `src/pages/LandingPage.tsx`

**Alterações:**

1. **Expandir o container** de `max-w-5xl` para `max-w-7xl` (1280px)
   - Isso dará mais espaço horizontal para as 4 imagens

2. **Aumentar a largura mínima das imagens no desktop**
   - Adicionar `md:min-w-[250px]` ou definir largura fixa maior

3. **Alternativa: Usar 2 linhas de 2 imagens**
   - Mudar para `md:grid-cols-2` permitiria imagens bem maiores
   - As imagens ficariam com ~500px cada

### Recomendação
A opção de manter 4 colunas com container maior (`max-w-7xl`) é a mais equilibrada, aumentando as imagens em ~25% sem alterar o layout.

```text
ATUAL (max-w-5xl = 1024px):
+-----+ +-----+ +-----+ +-----+
|~230px|~230px|~230px|~230px|
+-----+ +-----+ +-----+ +-----+

PROPOSTO (max-w-7xl = 1280px):
+-------+ +-------+ +-------+ +-------+
|~295px | |~295px | |~295px | |~295px |
+-------+ +-------+ +-------+ +-------+
```

## Detalhes Técnicos
- **Linha 632**: Mudar `max-w-5xl` para `max-w-7xl`
- Manter gap-6 para espaçamento adequado
- Manter proporções responsivas no mobile

## Resultado Esperado
As imagens dos recursos ficarão significativamente maiores no desktop, proporcionando melhor visualização das funcionalidades do app.

