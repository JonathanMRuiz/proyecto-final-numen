const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No se ha encontrado Token" });
  }

  try {
    const decoded = jwt.verify(token, "1a3e5i7");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Token User inválido" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = auth;

module.exports = auth;
