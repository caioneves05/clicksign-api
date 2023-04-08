# Documentação do Projeto de Consumo da API da Clicksign
Este projeto foi desenvolvido com o objetivo de demonstrar o uso da API da plataforma Clicksign para realizar o fluxo de criação de documento, criação de signatário, adição de signatário ao documento e notificação do signatário para assinar o documento, tudo isso via API.

## Tecnologias Utilizadas
* TypeScript
* Axios
* Query String
* Jest
## Pré-requisitos
Para utilizar este projeto é necessário ter uma conta na plataforma Clicksign e obter uma chave de API.

## Instalação
Para instalar as dependências do projeto, basta executar o seguinte comando na raiz do projeto:
```
npm install
```
## Configuração
Antes de executar o projeto, é necessário configurar a chave de API da plataforma Clicksign. Para fazer isso, basta copiar o arquivo .env.example para um novo arquivo chamado .env e definir a chave de API no campo CLICKSIGN_API_KEY.
```
ACESS_TOKEN= <sua APIKEY>
```
## Execução
Para executar o projeto, basta executar o seguinte comando na raiz do projeto:
```
npm run dev
```
## Testes
Os testes foram escritos utilizando o Jest e podem ser executados com o seguinte comando na raiz do projeto:
```
npm test
```
## Fluxo de Funcionamento

1. Criar Documento
Para criar um novo documento, é necessário enviar uma requisição POST para o endpoint `/api/v1/documents/access_token`. É necessário enviar um arquivo PDF para ser assinado e o nome do documento.

2. Criar Signatário
Para criar um novo signatário, é necessário enviar uma requisição POST para o endpoint ``/api/v1/signers/access_token`. É necessário enviar o nome e o e-mail do signatário.

3. Adicionar Signatário ao Documento
Para adicionar um signatário a um documento, é necessário enviar uma requisição POST para o endpoint `/api/v1/lists/access_token`. É necessário enviar o signatário e a mensagem de saudação.

4. Notificando signatário por Email
Para notificar o signatário por email, o campo `auths` do modelo de criação do signatário deverá ter sido preenchido com `['email']`, assim fazendo uma requisição POST para o endpoint `/api/v1/notifications/access_token`