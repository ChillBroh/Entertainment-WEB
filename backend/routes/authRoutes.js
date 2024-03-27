const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.loginUser);

module.exports = router;
