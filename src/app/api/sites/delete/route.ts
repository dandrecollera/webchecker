import { connect } from 'http2';
import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_DATABASE || "nextsitemonitor",
  })

  const table = '`images`';
  const sql = `DELETE FROM ${table} WHERE id = ${id}`;

  try {
    await connection.query(sql);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: `Website Deleted id: ${id}` });

}