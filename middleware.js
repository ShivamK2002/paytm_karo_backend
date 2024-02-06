const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Invalid Token1" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.username;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid Token", err: err });
  }
};
module.exports = authMiddleware;
