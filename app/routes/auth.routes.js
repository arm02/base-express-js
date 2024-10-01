const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  require("./header.routes")(app);
  app.post(
    "/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );
  app.post("/auth/signin", controller.signin);
};
