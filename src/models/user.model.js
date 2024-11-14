const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco_rua: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  endereco_numero: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  endereco_complemento: {
    type: DataTypes.STRING(255),
  },
  endereco_bairro: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  endereco_cidade: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  endereco_estado: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  endereco_cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Ativo', 'Removido'),
    defaultValue: 'Ativo',
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  usuario_criacao: {
    type: DataTypes.STRING(255),
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  usuario_atualizacao: {
    type: DataTypes.STRING(255),
  },
  data_remocao: {
    type: DataTypes.DATE,
  },
  usuario_remocao: {
    type: DataTypes.STRING(255),
  },
});

module.exports = User;
