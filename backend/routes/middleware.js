const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMidleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      msg: "Authorization Header is missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: error,
    });
  }
};

module.exports = {
  authMidleware,
};
