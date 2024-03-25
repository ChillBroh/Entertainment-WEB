const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const cookie = require("cookie-parser");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cookie());

//routes
const authRoutes = require("./routes/authRoutes");

//base url
const base = "/api/v1";
app.use(`${base}/auth`, authRoutes);

//connect to mongo db
const connectDb = require("./services/db");

//error handling middleware
app.use(errorHandler);
//port
const port = process.env.PORT || 3000;
//start server
app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
  connectDb();
});
