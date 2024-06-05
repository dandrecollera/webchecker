'use server';
import mysql, { RowDataPacket } from "mysql2/promise";

interface Image extends RowDataPacket {
  id: number;
  fileName: string;
}

export default async function Sites(): Promise<Image[]> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor",
  });

  const sql = 'SELECT * FROM `images`';

  try {
    const [rows, fields] = await connection.query<Image[]>(sql);
    return rows;

  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
}
