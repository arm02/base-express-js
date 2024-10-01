const jwt = require("jsonwebtoken");
module.exports.getUserByToken = function getUserByToken(req) {
  const token = req.headers["bizlif-access-token"];
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      return decoded;
    });
  }
  return null;
};
