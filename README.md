# Deep Space Store

## Descrição

Projeto para uma loja virtual fictícia chamada Deep Space Store. A aplicação consiste em uma página de pagamento onde os compradores podem visualizar ofertas de produtos, preencher seus dados pessoais, dados de entrega e selecionar o meio de pagamento para efetuar a compra.

## Configuração do Ambiente

### Passos

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/vue-node-store.git
    cd vue-node-store
    ```
2. Para executar o projeto, siga estas etapas:

### Com Docker

1. Rode na pasta raiz do projeto:  <pre> docker-compose up --build -d </pre> e a aplicação estará pronta para navegação.


2. Caso queira rodar testes, após o build, insira o comando <pre> docker-compose run -e COMMAND=test backend </pre> e o teste será executado e aparecerá no seu terminal.

## Sem Docker, ambiente Linux com Node 18

1. Na pasta frontend, execute <pre> npm install </pre> para instalar as dependências do frontend.


2. Na pasta backend, execute <pre> npm install </pre> para instalar as dependências do backend.

3. Em seguida, retirar a extensão "example" do arquivo .env.example.

4. Execute <pre> npx prisma migrate dev </pre> para configurar o Prisma.

5. Na pasta backend, execute <pre> npm run seed:offers </pre> para popular o banco de dados com ofertas fictícias.


6. Inicie o servidor do frontend executando <pre> npm run serve </pre> na pasta frontend. O projeto estará disponível em http://localhost:3000.


7. Inicie o servidor do backend executando <pre> npm start </pre> na pasta backend. O backend estará disponível em http://localhost:8000.


8. Certifique-se de que as portas 3000 e 8000 estejam disponíveis em seu sistema.


9. Se necessário, testes podem ser feitos através do comando <pre> npm test </pre>.