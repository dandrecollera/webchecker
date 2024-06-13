const mysql = require("mysql2/promise");

async function ImageTable() {
  console.log("Starting ImageTable function...");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor",
  });

  try {
    console.log("Connected to the database.");

    const [rows] = await connection.query("SHOW TABLES LIKE 'images'");
    console.log("Checked for 'images' table, result:", rows);

    if (Array.isArray(rows) && rows.length > 0) {
      console.log("'images' table already exists. Dropping table...");

      const dropTableQuery = `DROP TABLE images`;
      await connection.query(dropTableQuery);
      console.log("'images' table dropped successfully.");

      const createTableQuery = `
        CREATE TABLE images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          filename VARCHAR(255) NOT NULL,
          url VARCHAR(255) NOT NULL,
          wordpress BOOL DEFAULT false NOT NULL
        )
      `;
      await connection.query(createTableQuery);
      console.log("'images' table created successfully.");
    } else {
      console.log("'images' table does not exist. Creating table...");

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
    console.log("Closing the database connection.");
    await connection.end();
  }
}

module.exports = ImageTable;