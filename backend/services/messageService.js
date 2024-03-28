const db = require("../db");

const createMessage = async (message, chatId) => {
  try {
    const [rows] = await db.query("SELECT * FROM chats WHERE id = ?", [chatId]);
    if (rows.length === 0) {
      throw new Error("Chat Not Found!");
    }

    const insertQuery = "INSERT INTO messages (message, chatId) VALUES (?, ?)";
    const [result] = await db.query(insertQuery, [message, chatId]);

    if (result.affectedRows === 0) {
      throw new Error(`Failed to send message`);
    }
    const newMessageId = result.insertId;
    return {
      id: newMessageId,
      message: message,
      chatId: chatId,
    };
  } catch (error) {
    throw error;
  }
};

const getAllMessages = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM messages where chatId = ?", [
      id,
    ]);
    if (rows.length == 0) {
      return {
        message: "No messages in this chat!",
      };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { createMessage, getAllMessages };
