const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const registerUser = async (req) => {
  const { firstName, lastName, email, nic, password, phone, role } = req;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email LIKE ?", [
      `%${email}%`,
    ]);

    if (rows.length > 0) {
      throw new Error("User Already Exists!");
    }
    //check if the role is admin
    if (role == "Admin") {
      throw new Error("You cannot add Admin Roles!");
    }
    //password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO users (firstName, lastName, email, nic, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const insertUser = await db.query(insertQuery, [
      firstName,
      lastName,
      email,
      nic,
      phone,
      hash,
      role,
    ]);
    if (insertUser.affectedRows == 0) {
      throw new Error("User Registration Failed Due to Datebase Error!");
    }
    return {
      message: "User Registered Successfully",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and Password Required!");
    }
    const [rows] = await db.query("SELECT * FROM users WHERE email LIKE ?", [
      `%${email}%`,
    ]);
    if (rows.length == 0) {
      const error = new Error("User Not Found!");
      error.statusCode = 404;
      throw error;
    }
    const user = rows[0];
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
      return createSendToken(user);
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

//created token
const signToken = (email, confirmed, role) => {
  return jwt.sign({ email, confirmed, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user) => {
  // Remove password from output
  user.password = undefined;

  const token = signToken(user.email, user.confirmed, user.role);

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return {
    status: "success",
    token,
    cookieOptions,
  };
};

module.exports = { registerUser, loginUser };
