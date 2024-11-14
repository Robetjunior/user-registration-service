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
npm run dev
```
## Documentação no Swagger
Para acessar a documentação interativa da API, utilize o Swagger UI disponível no seguinte endpoint:
```
http://localhost:8080/api-docs
```
Através desta interface, você pode explorar e testar os endpoints da API de forma intuitiva.


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

### Exemplos de Testes com Insomnia

**Autenticação (`/auth/signin`):**

- URL: `http://localhost:8080/api/auth/signin`
- Método: `POST`
- Body:
```json
{
 "cpf": "12345678900",
 "senha": "novaSenha123"
}
```

Resultado esperado:
```
{
  "message": "Login realizado com sucesso",
  "token": "seu_token_jwt"
}
```

## Testes

Este projeto inclui testes automatizados para as rotas de autenticação e gerenciamento de usuários.

### Executando os Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm test
```

[Meu Perfil no Linkedin: ][(https://www.linkedin.com/in/jose-roberto/)](https://www.linkedin.com/in/jos%C3%A9-roberto-dev/)


