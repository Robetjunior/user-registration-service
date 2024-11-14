const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/authJwt');
const { validateUser } = require('../utils/validation');

// Rotas de autenticação
router.post('/auth/signup', validateUser, userController.signup);
router.post('/auth/signin', userController.signin);

// Rota pública para criar um novo usuário diretamente
router.post('/users/create', validateUser, userController.createUser);

// Rotas protegidas (necessitam de autenticação)
router.get('/users', verifyToken, userController.findAllUsers);
router.get('/users/:id', verifyToken, userController.findById);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

module.exports = router;
