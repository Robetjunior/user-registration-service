# Teste Técnico para Desenvolvedor Full Stack

## Descrição
API RESTful para gerenciamento de usuários utilizando Node.js, Express, Sequelize e MySQL.

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize
- MySQL
- JWT (Json Web Token)
- bcryptjs
- express-validator
- Amazon Web Services (AWS)
  - Amazon RDS (Relational Database Service)
- Swagger (Documentação da API)

## Requisitos
- Node.js (versão 14 ou superior)
- MySQL Server

## Configuração do Ambiente

1. **Clone o Repositório**
```
git clone https://github.com/seu-usuario/seu-repositorio.git cd seu-repositorio
```

2. **Instale as Dependências**
```
npm install
```

3. **Crie um Arquivo `.env`**
```
PORT=8080 
DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=suasenha 
DB_NAME=sb_sirio_libanes 
SECRET_KEY=minha-chave-secreta
```
4. **Execute a Aplicação**
```
npm run start
```
## Documentação da API (Swagger)
A documentação da API está disponível através do Swagger. Para acessá-la, siga os passos:

Após iniciar a aplicação, abra o navegador e acesse:
```
http://localhost:8080/api-docs
```
Utilize a interface do Swagger para explorar os endpoints e testar a API de forma interativa.

## Endpoints da API

### Autenticação
- **POST** `/api/auth/signup` - Registrar um novo usuário
- **POST** `/api/auth/signin` - Autenticar e obter token JWT

### Usuários (Necessário Autenticação)
- **POST** `/api/users/create` - Criar usuário
- **GET** `/api/users` - Listar todos os usuários
- **GET** `/api/users/:id` - Buscar usuário por ID
- **PUT** `/api/users/:id` - Atualizar usuário
- **DELETE** `/api/users/:id` - Remover usuário

## Testes Automatizados

Este projeto inclui testes automatizados utilizando **Jest** e **Supertest** para garantir o correto funcionamento das funcionalidades da API.

### Como Executar os Testes

Certifique-se de que você tem todas as dependências instaladas e que o ambiente de banco de dados está configurado corretamente.

Para rodar os testes, utilize o seguinte comando:
```
npm test
```

### O que é Testado

Os testes cobrem os seguintes cenários:
- **Criação de Usuário**: (`POST /api/auth/signup`)
  - Usuários podem ser registrados com sucesso.
  - Um erro é retornado se o CPF já estiver registrado.
- **Autenticação**: (`POST /api/auth/signin`)
  - Usuários podem se autenticar com sucesso utilizando as credenciais corretas.
  - Um erro é retornado se a senha estiver incorreta.
- **Listagem de Usuários**: (`GET /api/users`)
  - Apenas usuários autenticados podem acessar a lista de usuários.

Os testes garantem que:
- O fluxo de criação e autenticação de usuários funciona corretamente.
- A proteção de rotas autenticadas está implementada.

### Exemplos de Testes com Insomnia

**Autenticação (`/auth/signin`):**

- URL: `http://localhost:8080/api/auth/signin`
- Método: `POST`
- Body:
```json
{
 "cpf": "12345678901",
 "senha": "senhaSegura"
}
```

Resultado esperado:
```
{
  "message": "Login realizado com sucesso",
  "token": "seu_token_jwt"
}
```