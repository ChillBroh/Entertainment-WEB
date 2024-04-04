const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "entertainmentDb",
});
console.log(`DB connecting...`);

module.exports = connectionPool;
