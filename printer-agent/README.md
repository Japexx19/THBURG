# Agente de impressão da TH

Este programa roda no computador Windows que ficará conectado à impressora USB.

## Preparação
1. Instale Node.js LTS no computador.
2. Copie `config.example.json` para `config.json`.
3. Preencha `apiUrl`, `apiKey` e o nome exato da impressora no Windows.
4. Dentro desta pasta, rode:
   `npm install`
5. Depois:
   `npm start`

## Observação
A impressão automática depende de a impressora estar instalada no Windows e disponível pelo nome configurado. Na próxima etapa podemos ajustar o formato para o modelo exato da sua impressora.
