validateToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      res.status(403).json({
        success: false,
        message: err.message,
      });
      return;
    }
    next();
  });
};

const tokenMiddleware = {
  validateToken,
};
module.exports = tokenMiddleware;
