const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sb_sirio_libanes', 'admin', 'Aa!((797Aa!((797', {
  host: 'db-sirio-libanes.cxqkysigaunf.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306,
  logging: false, // Desativa o log de consultas SQL
  dialectOptions: {
    connectTimeout: 10000 // Timeout para conectar
  }
});

module.exports = sequelize;
