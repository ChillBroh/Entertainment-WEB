const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, nic, password, phone, role } = req.body;
  try {
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      throw new Error("User Already Exists!");
    }
    //check is the role is admin
    if (role == "Admin") {
      throw new Error("You cannot add Admin Roles!");
    }
    //password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      nic,
      phone,
      password: hash,
      role,
    });
    const savedUser = await newUser.save();
    if (!savedUser) {
      throw new Error("Error While saving user");
    }
    res.status(201).json({
      status: "success",
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Email and Password Required!");
    }
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      const error = new Error("User Not Found!");
      error.statusCode = 404;
      throw error;
    }
    //check email confirm
    if (!user.confirmed) {
      throw new Error("Please Verify Your Email!");
    }

    //check password
    let passwordMatch;
    await bcrypt
      .compare(password, user.password)
      .then((res) => {
        passwordMatch = res;
      })
      .catch((err) => console.error(err.message));

    if (passwordMatch) {
      createSendToken(user, 200, res);
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

//created token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  // Remove password from output
  user.password = undefined;

  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("You are not logged In!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

//Give rolebase authentication for protected routes
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
module.exports = { registerUser, loginUser, protect, restrictTo };
