const mysql = require("mysql2/promise");

async function UserTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor",
  });

  try {
    const [rows] = await connection.query("SHOW TABLES LIKE 'users'");

    if (Array.isArray(rows) && rows.length > 0) {
      const dropTableQuery = `DROP TABLE users`;
      await connection.query(dropTableQuery);

      const createTableQuery = `
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `;
      await connection.query(createTableQuery);

      const insertUserQuery =
        'INSERT INTO `users` (username, password) VALUES ("admin", "$2a$10$S3Hu3Vzyt9Chtg/ExJuUqOhn7EaOy3aE8mb3VUjNbU31Gly8fu7eS")';

      await connection.query(insertUserQuery);
    } else {
      const createTableQuery = `
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `;
      await connection.query(createTableQuery);

      const insertUserQuery =
        'INSERT INTO `users` (username, password) VALUES ("admin", "$2a$10$S3Hu3Vzyt9Chtg/ExJuUqOhn7EaOy3aE8mb3VUjNbU31Gly8fu7eS")';

      await connection.query(insertUserQuery);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

module.exports = UserTable;
