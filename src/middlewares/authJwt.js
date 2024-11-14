const jwt = require("jsonwebtoken");
const SECRET_KEY = 'minha-chave-secreta';

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Token não fornecido!" });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
