const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const cookie = require("cookie-parser");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cookie());
app.use(cors());
//routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
//base url
const base = "/api/v1";
app.use(`${base}/auth`, authRoutes);
app.use(`${base}/chat`, chatRoutes);
app.use(`${base}/message`, messageRoutes);

//error handling middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 5000;

//connect to db
const connectDb = require("./db");

const startServer = async () => {
  try {
    await connectDb.query("SELECT 1");
    console.log("DB Connected 😎");
    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port} 🔥`);
    });
  } catch (err) {
    console.log(`db connection failed. \n${err}`);
  }
};

startServer();
