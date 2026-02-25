

# Plano: Atualizar Texto do Hero na Landing Page

## Objetivo
Substituir o título e subtítulo atuais do Hero Section pelo novo texto, aplicando cores de destaque (vermelho e azul) nas palavras indicadas.

## Texto Atual (a ser removido)
- H1: "Bateu A Meta: Transforme Sua Gestão Financeira Pessoal em Resultados Reais!"
- H2: "Conquiste Seus Objetivos Financeiros Com O Poder Da Organização E Planejamento Inteligente."

## Novo Texto (com cores)
- <span class="text-brand-red">Aposente o caderninho e as planilhas complicadas!</span> Chegou o <span class="text-brand-blue">Bateu a Meta</span>: o App para Celular, Tablet ou PC. Domine seus <span class="text-brand-blue">Ganhos e Despesas</span> por Hora e por KM rodado com um clique.

## Alteração

### Arquivo: `src/pages/LandingPage.tsx` (linhas 350-357)

**Remover** o H1 e H2 atuais e **substituir** por um único H1 com o novo texto e as cores aplicadas:

```tsx
<h1 className="text-xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl text-black">
  <span className="text-brand-red">Aposente o caderninho e as planilhas complicadas!</span>{" "}
  Chegou o <span className="text-brand-blue">Bateu a Meta</span>: o App para Celular, Tablet ou PC. Domine seus{" "}
  <span className="text-brand-blue">Ganhos e Despesas</span> por Hora e por KM rodado com um clique.
</h1>
```

## Cores Utilizadas
- **Vermelho** (`text-brand-red` = #c41313): "Aposente o caderninho e as planilhas complicadas!"
- **Azul** (`text-brand-blue` = #3c83f6): "Bateu a Meta" e "Ganhos e Despesas"
- **Preto** (`text-black`): restante do texto

## O que será removido
- O H2 com "Conquiste Seus Objetivos Financeiros..." (linha 355-357) — o novo texto já é completo e substitui ambos os elementos.

