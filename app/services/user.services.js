const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../models");
const User = db.user;

exports.registerUser = async (userData) => {
  try {
    const hashedPassword = bcrypt.hashSync(userData.password, 8);

    const user = await User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      fullname: userData.fullname,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      const error = new Error("User Not found.");
      error.statusCode = 404;
      throw error;
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      const error = new Error("Invalid Password!");
      error.statusCode = 401;
      throw error;
    }

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    };

    const token = jwt.sign(userResponse, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    return { user: userResponse, token };
  } catch (error) {
    throw new Error(error.message);
  }
};
