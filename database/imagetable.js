const mysql = require("mysql2/promise");

async function ImageTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor",
  });

  try {
    const [rows] = await connection.query("SHOW TABLES LIKE 'images'");
    if (Array.isArray(rows) && rows.length > 0) {
      console.log("'images' table already exists.");
      const dropTableQuery = `
        DROP TABLE images
      `;
      await connection.query(dropTableQuery);

      const createTableQuery = `
        CREATE TABLE images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          filename VARCHAR(255) NOT NULL
        )
      `;
      await connection.query(createTableQuery);
      console.log("'images' table created successfully.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

module.exports = ImageTable;
