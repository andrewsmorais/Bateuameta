

## Reorganizar Fontes de Ganho dentro de Métricas do Turno

### O que sera feito

No arquivo `src/pages/KM.tsx`:

1. **Remover a seção separada "Fontes de Ganho"** (linhas 300-320)

2. **Dentro de "Métricas do Turno"**, logo após o título h4, adicionar as fontes de ganho com o veículo ao lado — sem bordas/linhas separadoras, sem o valor R$

3. **Remover o `border-t border-border`** da div de métricas para não ter linha separando das fontes

### Layout

Para cada fonte: `Fonte: Uber  19 corridas   Veículo: Palio (FFF-3C96)` — tudo na mesma linha, sem pipes `|`, sem bordas, sem valor monetário

### Detalhes técnicos

- Remover bloco linhas 300-320 (seção "Fontes de Ganho" separada)
- Na div de "Métricas do Turno" (linha 323), remover `border-t border-border` e `pt-4`
- Após o h4 "Métricas do Turno", inserir bloco com cada fonte mostrando:
  - `Fonte: {nome}` + `{quantidade} corridas/entregas` (usando lógica fontesEntrega) + `Veículo: {modelo} ({placa})`
- Layout flex-row com gap, sem border-l, sem separadores visuais
- Manter o grid de métricas (KM Rodados, etc.) logo abaixo

