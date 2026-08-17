# TH Lanches — plano do projeto

## Objetivo
Transformar o cardápio atual em um sistema de pedidos online com:
- cardápio responsivo;
- carrinho;
- entrega ou retirada;
- endereço e taxa;
- forma de pagamento;
- pedido salvo no servidor;
- painel da loja;
- mudança de status;
- impressão automática em impressora USB;
- integração opcional com WhatsApp;
- segurança e backup.

## Ordem de implementação
1. **Base atual:** visual + produtos + carrinho.
2. **Servidor Hostinger:** PHP + MySQL + API.
3. **Checkout real:** nome, telefone, endereço, entrega/retirada, pagamento e observações.
4. **Painel:** pedidos novos e status.
5. **Impressão:** computador da loja + agente + impressora USB.
6. **WhatsApp:** botão opcional para enviar o pedido.
7. **Pagamento online:** Pix/gateway, se a loja quiser.
8. **Administração:** login, produtos, preços, categorias, horários e taxa de entrega.
9. **Segurança:** autenticação, validação, proteção de endpoints e backups.
10. **Publicação:** domínio + SSL + testes completos.

## O que falta informar
- logo oficial da TH;
- cores da marca;
- endereço real da loja;
- bairros/área de entrega e respectivas taxas;
- telefone/WhatsApp;
- produtos e preços definitivos;
- marca/modelo da impressora;
- computador que ficará ligado à impressora;
- formas de pagamento aceitas.

## Importante
O arquivo `config.php` deve ser criado na hospedagem a partir de `config.example.php` e não deve ser publicado em repositório público.
