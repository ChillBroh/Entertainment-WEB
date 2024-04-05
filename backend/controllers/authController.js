const authService = require("../services/authService");
const cookie = require("cookie-parser");
const db = require("../db");

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
    if (req.body.orgId) {
      const orgId = await db.query(
        "SELECT * FROM organizers WHERE organizerId = ?",
        [`${req.body.orgId}`]
      );
      console.log(orgId);
      if (orgId[0].length == 0) {
        const error = new Error("Invalid Organizer Id!");
        error.statusCode = 404;
        throw error;
      }
    }
    const result = await authService.loginUser(email, password);
    res.cookie("jwt", result.token, result.cookieOptions);
    res.status(201).json({
      status: result.status,
      token: result.token,
      role: result.role,
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

const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "logged Out!",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, loginUser, emailVerify, sendEmailVerify, logout };
