const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const security = require("../utils/security");

router
  .route("/")
  .post(
    security.protect,
    security.restrictTo("Organizer"),
    chatController.createChat
  )
  .get(security.protect, chatController.getAllChats);

router
  .route("/:id")
  .delete(
    security.protect,
    security.restrictTo("Organizer"),
    chatController.deleteChat
  );

module.exports = router;
