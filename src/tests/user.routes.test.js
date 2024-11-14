const request = require('supertest');
const { app, closeDatabaseConnection } = require('../app');

afterAll(async () => {
  // Fecha a conexão com o banco após todos os testes
  await closeDatabaseConnection();
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

describe('GET /api/users', () => {
    it('deve listar todos os usuários', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                cpf: '12345678902',
                nome: 'Carlos Pereira',
                data_nascimento: '1975-07-07',
                senha: 'senha321',
                endereco_rua: 'Rua D',
                endereco_numero: '400',
                endereco_bairro: 'Bairro D',
                endereco_cidade: 'Curitiba',
                endereco_estado: 'PR',
                endereco_cep: '40000-000'
            });

        const loginResponse = await request(app)
            .post('/api/auth/signin')
            .send({
                cpf: '12345678902',
                senha: 'senha321'
            });

        const token = loginResponse.body.token;

        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
