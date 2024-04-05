const chatService = require("../services/chatService");
const security = require("../utils/security");

const createChat = async (req, res, next) => {
  try {
    const decode = security.decode(req.headers.authorization);
    const result = await chatService.createChat(
      req.body.chatImg,
      req.body.chatName,
      decode.email
    );
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const result = await chatService.getAllChats();
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const result = await chatService.deleteChat(req.params.id);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const updateChat = async (req, res, next) => {
  try {
    const result = await chatService.updateChat(req.body, req.params.id);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { createChat, getAllChats, deleteChat, updateChat };
