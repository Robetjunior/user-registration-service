const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require('./config/db.config');
const userRoutes = require("./routes/user.routes"); // Importar as rotas
const app = express();
const User = require("./models/user.model");

app.use(cors());
app.use(bodyParser.json());

// Sincroniza o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados com sucesso.');

    // Sincronizar o modelo de usuário
    await User.sync({ alter: true });
    console.log('Tabela User criada ou alterada com sucesso.');

    // Registrar rotas
    app.use('/api', userRoutes); // Usando um prefixo '/api'

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}.`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar com o banco de dados:', error);
  }
})();