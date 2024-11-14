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
setupSwagger(app);
app.use('/api', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Conectado ao banco de dados com sucesso.');
      await User.sync({ alter: true });
    } catch (error) {
      console.error('Erro ao sincronizar com o banco de dados:', error);
    }
  })();
}

module.exports = app;
