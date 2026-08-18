# Alteração — Pedido para consumo no local

- Adicionada a opção **Mesa** junto de Entrega e Retirada.
- Cliente informa o nome para identificar o pedido no local.
- Pedido de mesa não recebe taxa de entrega.
- Pagamento no local usa as mesmas opções de dinheiro, crédito, débito e vales.
- Painel administrativo mostra “Mesa — Nome”.
- Agente de impressão imprime “MESA” e o nome informado.
- Banco: executar `database/migration-mesa.sql` na instalação existente.
