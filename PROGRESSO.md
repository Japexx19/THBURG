# Progresso

## O que foi validado de verdade nesta sessão

- Todas as telas do site original (`menu.brendi.com.br/o-burger-na-brasa`) foram
  mapeadas navegando de verdade pelo fluxo real: cardápio → produto com
  adicionais → carrinho → endereço (cidade → região → formulário) → forma de
  pagamento → resumo — via automação de navegador, com screenshots reais de
  cada etapa.
- A réplica foi servida localmente (`python -m http.server`) e testada
  ponta a ponta com Playwright headless (Chromium), clicando de fato em
  cada botão do fluxo (adicionar produto, abrir carrinho, preencher e
  salvar endereço, escolher Pix, revisar e "confirmar" o pedido) e
  capturando screenshot de cada tela.
- `console --errors` / `pageerror` do Playwright não acusaram nenhum erro
  de JavaScript em nenhuma etapa do fluxo testado.
- Corrigido durante o teste: a categoria "Mais Pedidos" aparecia duplicada
  (uma vez no carrossel de destaque, outra na listagem vertical) — ajustado
  para usar um flag `mostOrdered` nos produtos em vez de uma categoria
  própria, replicando o comportamento do site original.

## O que NÃO foi validado

- **Não testado em navegador real/visual interativo** — a extensão de
  automação de navegador desta sessão não conseguiu alcançar servidores
  locais iniciados via terminal (ambientes de rede separados); a validação
  foi feita via Playwright headless, não por inspeção visual direta em um
  Chrome real. Vale abrir manualmente pelo menos uma vez antes de usar em
  produção.
- **Não testado em mobile real** (touch, teclado virtual, safe-area de
  notch) — só viewport simulado de 480px no Playwright.
- **Sem auditoria de acessibilidade** (contraste, navegação por teclado,
  leitores de tela).
- **Sem teste cross-browser** (Firefox, Safari) — só Chromium.
- ~~Imagens são todas placeholders SVG genéricos~~ — ver atualização abaixo.
- ~~Publicação no GitHub Pages~~ — ver atualização abaixo.

## Decisões pendentes (do usuário, não técnicas)

- Se este projeto vai virar produto real (com backend, pagamento de
  verdade, etc.) ou permanece como peça de portfólio/demonstração visual.

## Atualização — rebranding e cardápio "de podrão"

- Marca trocada de "Burger na Brasa" para **Revoada Lanches**, a pedido do
  usuário (`js/data.js` → `STORE.name`).
- Cardápio reescrito para o estilo lanchonete/podrão brasileiro: kits com
  mini burgers (sliders) + fritas + anéis de cebola, X-Burger/X-Salada/
  X-Bacon/X-Tudo/X-Egg, cachorro-quente simples e completo, porções e
  bebidas — substituindo o cardápio de hamburgueria "gourmet" anterior.
- Imagens placeholder (SVG genéricos) substituídas por fotos reais de
  comida do banco gratuito **Pexels** (licença livre, sem atribuição
  obrigatória) — uma foto por produto, escolhida por busca textual, não
  geradas nem fotografadas pelo estabelecimento real. Continuam sendo
  fotos de banco, não do restaurante de verdade — trocar antes de usar em
  produção. Créditos e link da licença no README.
- **GitHub Pages foi ativado nesta sessão** (`gh api .../pages`, branch
  `main`, path `/`) e o build de fato aconteceu (`status: built`
  confirmado via polling da API) — o site está no ar em
  `https://ronaldoribeirosm.github.io/cardapio-burger-na-brasa/` e foi
  aberto e conferido visualmente no navegador real do usuário
  (claude-in-chrome), não só via Playwright headless.
- Não validado nesta atualização: as novas imagens não foram checadas uma
  a uma quanto a licença individual da foto (confiei na licença geral do
  Pexels, que é permissiva) — se este projeto virar produto comercial de
  verdade, vale revisar a licença de cada foto específica antes de manter
  em produção por muito tempo.
