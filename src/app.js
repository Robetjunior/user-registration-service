// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const setupSwagger = require('./swagger');
const User = require('./models/user.model');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuração do Swagger
setupSwagger(app);

// Registrar rotas
app.use('/api', userRoutes);

// Função para sincronizar o banco de dados
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados com sucesso.');
    await User.sync({ alter: true });
    console.log('Tabela User criada ou alterada com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar com o banco de dados:', error);
  }
};

// Função para fechar a conexão do banco de dados
const closeDatabaseConnection = async () => {
  await sequelize.close();
  console.log('Conexão com o banco de dados encerrada.');
};

// Inicializar o banco de dados se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  initializeDatabase();
}

module.exports = { app, initializeDatabase, closeDatabaseConnection };
