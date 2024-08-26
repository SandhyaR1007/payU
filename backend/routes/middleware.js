const { JWT_TOKEN } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token" });
  }
  authToken = authToken.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, JWT_TOKEN);
    console.log(decoded);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    res.status(401).json({ message: "Some error occurred" });
  }
};

module.exports = { authMiddleware };
