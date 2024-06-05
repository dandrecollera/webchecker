const mysql = require("mysql2/promise");

async function CreateDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
  });

  try {
    const [rows] = await connection.query("SHOW DATABASES LIKE 'nextsitemonitor'");
    if (Array.isArray(rows) && rows.length > 0) {
      console.log("Database already exists.");
    } else {
      await connection.query("CREATE DATABASE nextsitemonitor");
      console.log("Database created successfully.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

module.exports = CreateDB;
