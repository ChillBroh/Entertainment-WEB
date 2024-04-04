const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const security = require("../utils/security");

router
  .route("/")
  .post(
    security.protect,
    security.restrictTo("Organizer"),
    messageController.createMessage
  );
router
  .route("/:chatId")
  .get(security.protect, messageController.getAllMessages);

module.exports = router;
