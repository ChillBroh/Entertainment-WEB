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

const routeProtect = async (req, res, next) => {
  try {
    const status = await authService.protect(req);
    next();
  } catch (error) {
    next(error);
  }
};

//Give rolebase authentication for protected routes
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("You don't have permission for this action!");
    }
    next();
  };
};

module.exports = { register, loginUser, routeProtect };
