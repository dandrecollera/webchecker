import { NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";

interface Sites extends RowDataPacket {
  id: number;
  name: string;
  filename: string;
}

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor",
  });

  const table = '`images`';
  const sql = `SELECT * FROM ${table}`;

  try {
    const [rows] = await connection.query<Sites[]>(sql);
    return NextResponse.json(rows); 
  } catch (error) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }
} 