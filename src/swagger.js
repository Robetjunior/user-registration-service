const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Usuários',
      version: '1.0.0',
      description: 'Documentação da API para o gerenciamento de usuários',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['cpf', 'nome', 'data_nascimento', 'senha'],
          properties: {
            cpf: { type: 'string' },
            nome: { type: 'string' },
            data_nascimento: { type: 'string', format: 'date' },
            senha: { type: 'string' },
            endereco_rua: { type: 'string' },
            endereco_numero: { type: 'string' },
            endereco_complemento: { type: 'string' },
            endereco_bairro: { type: 'string' },
            endereco_cidade: { type: 'string' },
            endereco_estado: { type: 'string' },
            endereco_cep: { type: 'string' },
            status: { type: 'string', enum: ['Ativo', 'Removido'] },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = setupSwagger;
