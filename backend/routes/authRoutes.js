const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.loginUser);
router.route("/:email/verify/:token").get(authController.emailVerify);
router.route("/verify/:email").get(authController.sendEmailVerify);
router.route("/reset-pass/:email").get(authController.sendTokenVerify);
router.route("/reset-pass").post(authController.otpVerify);
router.route("/logout").get(authController.logout);

module.exports = router;
