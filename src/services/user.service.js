const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'minha-chave-secreta';

exports.createUser = async (userData) => {
  const { cpf, senha } = userData;

  // Verificar se o CPF já está registrado
  const existingUser = await User.findOne({ where: { cpf } });
  if (existingUser) {
    throw new Error('CPF já cadastrado');
  }

  // Criptografar a senha, se fornecida
  const hashedPassword = senha ? await bcrypt.hash(senha, 10) : null;

  const user = await User.create({
    ...userData,
    senha: hashedPassword,
    status: 'Ativo',
    data_criacao: new Date(),
    usuario_criacao: 'Sistema',
  });

  return user;
};

exports.authenticateUser = async (cpf, senha) => {
  const user = await User.findOne({ where: { cpf } });
  if (!user) throw new Error('Usuário não encontrado');

  if (user.senha && !(await bcrypt.compare(senha, user.senha))) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  return { token };
};

exports.getAllUsers = async () => await User.findAll();

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');
  return user;
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');

  const hashedPassword = userData.senha ? await bcrypt.hash(userData.senha, 10) : user.senha;
  await user.update({ ...userData, senha: hashedPassword, data_atualizacao: new Date() });

  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuário não encontrado');
  await user.destroy();
};
