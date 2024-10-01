const helper = require("../helper/helper");
const userService = require("../services/user.services");

exports.signup = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.send({
      message: "User registered successfully!",
      data: {
        username: result.username,
        email: result.email,
        fullname: result.fullname,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || helper.DEFAULT_ERROR_MESSAGE });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userService.loginUser(username, password);
    res.status(200).send({
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || helper.DEFAULT_ERROR_MESSAGE });
  }
};
