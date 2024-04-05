const messageService = require("../services/messageService");

const createMessage = async (req, res, next) => {
  try {
    const result = await messageService.createMessage(
      req.body.message,
      req.body.chatId
    );
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const result = await messageService.getAllMessages(req.params.chatId);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage, getAllMessages };
