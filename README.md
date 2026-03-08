# Desafio Técnico Jitterbit: API de Gestão de Pedidos

## Autor

Desenvolvido por **Nenufar Marini**.

* [LinkedIn](https://www.linkedin.com/in/nenufar-marini-964407265/)
* [GitHub](https://github.com/theNenufar/)
* [Email](mailto:nenufarmarinidias@gmail.com)

---

Esta é uma API desenvolvida em **Node.js** com **JavaScript** puro para o gerenciamento de pedidos, seguindo as especificações do desafio técnico da Jitterbit.

## Decisões Técnicas e Arquitetura

Como desenvolvedor com experiência em **Java/Spring Boot**, optei por trazer padrões consolidados de robustez para este projeto Node.js:

-   **Arquitetura em Camadas:** O projeto está dividido em Controller, Service e Repository, garantindo separação de responsabilidades e facilidade de manutenção.
-   **Integridade de Dados (Transactions):** Diferente de implementações simples em JS, utilizei transações SQL (`BEGIN/COMMIT/ROLLBACK`) em todas as operações de escrita. Isso garante que Pedidos e Itens sejam persistidos de forma atômica (ou salva tudo, ou nada), simulando o comportamento do `@Transactional` do JPA.
-   **PostgreSQL com Docker:** Escolhi o PostgreSQL pela sua forte consistência e utilizei Docker para facilitar o setup do ambiente, garantindo que a aplicação rode exatamente da mesma forma em qualquer máquina.
-   **Segurança e Configuração (.env):** O projeto utiliza variáveis de ambiente para gerenciar credenciais sensíveis.
    > **Nota:** Por boas práticas de segurança, o arquivo .env real foi ignorado no Git (através do .gitignore). No entanto, forneci um arquivo .env.example com as configurações necessárias para que a aplicação possa ser testada imediatamente pelo avaliador. Em um cenário real de produção, essas chaves jamais seriam expostas no repositório.
    
## Tecnologias Utilizadas

-   Node.js & Express
-   PostgreSQL (Driver `pg`)
-   Docker & Docker Compose

## Como Instalar e Rodar

### 1. Pré-requisitos
-   Docker e Docker Compose instalados.
-   Node.js instalado (v16+ recomendado).

### 2. Configurar Variáveis de Ambiente
É necessário criar o seu arquivo .env a partir do modelo fornecido para que a aplicação consiga se conectar ao banco de dados:
```bash
cp .env.example .env
```
As configurações padrão no .env.example já estão configuradas para rodar com o Docker Compose deste projeto.

### 3. Configuração do Banco (Docker)
Na raiz do projeto, suba o container do banco de dados:
```bash
docker-compose up -d
```

Aguarde alguns segundos para o banco de dados inicializar totalmente antes de rodar o servidor.

### 4. Instalar Dependências e Iniciar o Servidor

#### Instala as dependências do Node.js

```bash
npm install
```

#### Inicia a aplicação (executa o script definido no package.json)

```bash
npm start
```

### A API estará disponível para testes em: http://localhost:3000

## Endpoints Principais

* **POST** /order: Cria um pedido.
* **GET** /order/list: Lista todos os pedidos cadastrados no banco.
* **GET** /order/:orderId: Detalhes de um pedido específico passando o orderId na URL.
* **PUT** /order/:orderId: Atualiza valor e itens de um pedido existente.
* **DELETE** /order/:orderId: Remove o pedido e seus respectivos itens.
