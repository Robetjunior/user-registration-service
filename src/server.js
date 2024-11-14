// src/server.js
const { app, initializeDatabase } = require('./app');

const PORT = process.env.PORT || 8080;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
  });
});
