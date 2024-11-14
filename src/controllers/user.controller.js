const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'minha-chave-secreta'; // Certifique-se de proteger esta chave

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               senha:
 *                 type: string
 *               endereco_rua:
 *                 type: string
 *               endereco_numero:
 *                 type: string
 *               endereco_bairro:
 *                 type: string
 *               endereco_cidade:
 *                 type: string
 *               endereco_estado:
 *                 type: string
 *               endereco_cep:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 */

exports.signup = async (req, res) => {
  try {
    const { cpf, nome, data_nascimento, senha, endereco_rua, endereco_numero, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    if (!cpf || !nome || !data_nascimento || !senha || !endereco_rua || !endereco_numero || !endereco_bairro || !endereco_cidade || !endereco_estado || !endereco_cep) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    // Verificar se o CPF já está registrado
    const existingUser = await User.findOne({ where: { cpf } });
    if (existingUser) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const user = await User.create({
      cpf,
      nome,
      data_nascimento,
      senha: hashedPassword,
      endereco_rua,
      endereco_numero,
      endereco_bairro,
      endereco_cidade,
      endereco_estado,
      endereco_cep,
      status: 'Ativo',
      data_criacao: new Date(),
      usuario_criacao: 'Sistema'
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login do usuário (Sign In)
exports.signin = async (req, res) => {
  try {
    const { cpf, senha } = req.body;

    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ where: { cpf } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Se o usuário possui senha definida, verificar se a senha é válida
    if (user.senha) {
      const passwordIsValid = await bcrypt.compare(senha, user.senha);
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Senha inválida' });
      }
    } else {
      // Se o usuário não possui senha, permitir o login, mas emitir um aviso
      console.warn(`Usuário com CPF ${cpf} não possui senha definida.`);
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { cpf, nome, data_nascimento, senha } = req.body;

    // Verificar se o CPF já está registrado
    const existingUser = await User.findOne({ where: { cpf } });
    if (existingUser) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    // Criptografar a senha, se fornecida
    let hashedPassword = null;
    if (senha) {
      hashedPassword = await bcrypt.hash(senha, 10);
    }

    const user = await User.create({
      ...req.body,
      senha: hashedPassword,
      status: 'Ativo',
      data_criacao: new Date(),
      usuario_criacao: 'Sistema'
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Listar todos os usuários
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params; // Supondo que o ID seja passado como parâmetro na URL

  try {
    const user = await User.findByPk(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Atualizar um usuário pelo ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    data_nascimento,
    senha,
    endereco_rua,
    endereco_numero,
    endereco_complemento,
    endereco_bairro,
    endereco_cidade,
    endereco_estado,
    endereco_cep,
    status
  } = req.body;

  try {
    // Buscar o usuário pelo ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Criptografar a senha se uma nova senha for fornecida
    let hashedPassword = user.senha;
    if (senha) {
      hashedPassword = await bcrypt.hash(senha, 10);
    }

    // Atualizar os dados do usuário
    await user.update({
      nome: nome || user.nome,
      data_nascimento: data_nascimento || user.data_nascimento,
      senha: hashedPassword,
      endereco_rua: endereco_rua || user.endereco_rua,
      endereco_numero: endereco_numero || user.endereco_numero,
      endereco_complemento: endereco_complemento || user.endereco_complemento,
      endereco_bairro: endereco_bairro || user.endereco_bairro,
      endereco_cidade: endereco_cidade || user.endereco_cidade,
      endereco_estado: endereco_estado || user.endereco_estado,
      endereco_cep: endereco_cep || user.endereco_cep,
      status: status || user.status,
      data_atualizacao: new Date(),
      usuario_atualizacao: 'Sistema'
    });

    res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um usuário pelo ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};