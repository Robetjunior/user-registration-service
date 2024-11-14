const { Sequelize } = require('sequelize');
const sequelize = require('../config/db.config'); // Certifique-se de que esse caminho está correto
const User = require('./user.model');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adicione todos os modelos aqui
db.User = User;

module.exports = db;
