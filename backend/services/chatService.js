const db = require("../db");

const createChat = async (chatName, email) => {
  console.log("hi");
  try {
    const [rows] = await db.query("SELECT * FROM chats WHERE chatName LIKE ?", [
      `%${chatName}%`,
    ]);
    if (rows.length > 0) {
      throw new Error("chatName Already Exists!");
    }

    // Insert a new chat record into the database
    const currentDate = new Date().toISOString().slice(0, 10);
    const insertQuery =
      "INSERT INTO chats (chatName, creator, createdDate) VALUES (?, ?, ?)";
    const [result] = await db.query(insertQuery, [
      chatName,
      email,
      currentDate,
    ]);

    if (result.affectedRows === 0) {
      throw new Error(`Failed to create chat ${chatName}`);
    }
    const newChatId = result.insertId;
    return {
      id: newChatId,
      creator: email,
      createdDate: currentDate,
      chatName: chatName,
    };
  } catch (error) {
    throw error;
  }
};

const getAllChats = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM chats");
    return rows;
  } catch (error) {
    throw error;
  }
};

const deleteChat = async (id) => {
  try {
    const [rows] = await db.query("select * from chats where id = ?", [id]);
    if (rows.length === 0) {
      throw new Error("No chat Found!");
    }
    const deleteQuery = "delete from chats where id =  ?";
    const [result] = await db.query(deleteQuery, [id]);
    if (result.affectedRows === 0) {
      throw new Error("Chat removing failed!");
    }
    return { message: "Chat deleted successfully" };
  } catch (error) {
    throw error;
  }
};

const updateChat = async (newData, id) => {
  try {
    const [rows] = await db.query("select * from chats where id = ?", [id]);
    if (rows.length === 0) {
      throw new Error("No chat Found!");
    }
    const updateQuery = "UPDATE chats SET ? WHERE id = ?";
    const [result] = await db.query(updateQuery, [newData, id]);
    if (result.affectedRows === 0) {
      throw new Error("Chat updating failed!");
    }
    return { message: "Chat updated successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = { createChat, getAllChats, deleteChat, updateChat };
