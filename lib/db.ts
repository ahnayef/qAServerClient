import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", 
  user: "test", 
  password: "123456", 
  database: "quiz_app",
});

export default db;
