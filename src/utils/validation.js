const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('cpf').isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 dígitos'),
  check('nome').notEmpty().withMessage('Nome é obrigatório'),
  check('data_nascimento').isDate().withMessage('Data de nascimento inválida'),
  check('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
