import { connect } from 'http2';
import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const { id, title, url } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor"
  })


  const table = `images`;
  const sql = `UPDATE ${table} SET title = ?, url = ? WHERE id = ?`;

  try {
    await connection.query(sql, [title, url, id]);
    return NextResponse.json({ message: "Successfully updated website info" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update website info" }, { status: 500 })
  }
}