const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/db.config');
const User = require('../models/user.model');

beforeAll(async () => {
  await sequelize.authenticate();
  await User.sync({ force: true }); // Limpa a tabela antes de cada execução de teste
});

afterAll(async () => {
  await sequelize.close(); // Fecha a conexão após os testes
});

describe('POST /api/auth/signup', () => {
  it('Deve criar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        cpf: '12345678900',
        nome: 'João Silva',
        data_nascimento: '1990-01-01',
        senha: 'senhaSegura123',
        endereco_rua: 'Rua A',
        endereco_numero: '100',
        endereco_bairro: 'Centro',
        endereco_cidade: 'São Paulo',
        endereco_estado: 'SP',
        endereco_cep: '01000-000'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário registrado com sucesso');
  });

  it('Deve retornar erro ao tentar registrar um CPF já existente', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        cpf: '12345678900',
        nome: 'João Silva',
        data_nascimento: '1990-01-01',
        senha: 'senhaSegura123',
        endereco_rua: 'Rua A',
        endereco_numero: '100',
        endereco_bairro: 'Centro',
        endereco_cidade: 'São Paulo',
        endereco_estado: 'SP',
        endereco_cep: '01000-000'
      });

    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        cpf: '12345678900',
        nome: 'Maria Souza',
        data_nascimento: '1985-05-05',
        senha: 'outraSenha123',
        endereco_rua: 'Rua B',
        endereco_numero: '200',
        endereco_bairro: 'Bairro B',
        endereco_cidade: 'Rio de Janeiro',
        endereco_estado: 'RJ',
        endereco_cep: '20000-000'
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'CPF já cadastrado');
  });
});

describe('POST /api/auth/signin', () => {
  it('deve autenticar um usuário existente', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        cpf: '12345678901',
        nome: 'Ana Lima',
        data_nascimento: '1985-05-05',
        senha: 'senha789',
        endereco_rua: 'Rua C',
        endereco_numero: '300',
        endereco_bairro: 'Bairro C',
        endereco_cidade: 'Belo Horizonte',
        endereco_estado: 'MG',
        endereco_cep: '30000-000'
      });

    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        cpf: '12345678901',
        senha: 'senha789'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login realizado com sucesso');
    expect(response.body).toHaveProperty('token');
  });

  it('não deve autenticar com senha incorreta', async () => {
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        cpf: '12345678901',
        senha: 'senhaErrada'
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'Senha inválida');
  });
});
