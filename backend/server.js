const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

//connect to mongo db
const connectDb = require("./services/db");

//start server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
  connectDb();
});
