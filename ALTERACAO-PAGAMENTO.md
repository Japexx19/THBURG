# Alteração — Pagamento na entrega

Na opção **Entrega**, o checkout agora mostra somente:
- Dinheiro
- PIX
- Cartão

Ao escolher **Dinheiro**, o cliente pode informar se precisa de troco e, se sim, para qual valor. O valor informado é salvo no pedido, exibido no painel administrativo e impresso no comprovante.

## Banco de dados
Se o banco já foi criado antes desta alteração, execute:

`database/migration-pagamento.sql`
