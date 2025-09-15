import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(400).json({
        message: "user doesn't have a token",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      res.status(400).json({
        message: "user doesn't have a valid token",
      });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({
      message: `isAuth error ${error}`,
    });
  }
};

export default isAuth;
