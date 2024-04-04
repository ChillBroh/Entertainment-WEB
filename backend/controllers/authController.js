const authService = require("../services/authService");
const cookie = require("cookie-parser");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await authService.loginUser(email, password);
    res.cookie("jwt", result.token, result.cookieOptions);
    res.status(201).json({
      status: result.status,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};
const sendEmailVerify = async (req, res, next) => {
  const { email } = req.params;
  try {
    const result = await authService.sendEmailagain(email);
    res.status(201).json({
      message: "Verification Email Has sent!",
    });
  } catch (error) {
    next(error);
  }
};
const emailVerify = async (req, res, next) => {
  const { email, token } = req.params;
  try {
    const result = await authService.emailConfirm(email, token);
    res.status(201).json({
      status: result.status,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, loginUser, emailVerify, sendEmailVerify };
