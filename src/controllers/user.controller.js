const userService = require('../services/user.service');

/**
 * Criação de um novo usuário
 */
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Registro (SignUp) de um novo usuário
 */
exports.signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Autenticação (SignIn) de um usuário
 */
exports.signin = async (req, res) => {
  try {
    const { cpf, senha } = req.body;
    const { token } = await userService.authenticateUser(cpf, senha);
    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

/**
 * Listar todos os usuários
 */
exports.findAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar um usuário por ID
 */
exports.findById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * Atualizar um usuário pelo ID
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Deletar um usuário pelo ID
 */
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
