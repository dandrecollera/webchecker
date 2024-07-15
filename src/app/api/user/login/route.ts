import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise"
import connection from "@/utils/db";

interface Users extends RowDataPacket {
  id: number;
  username: string;
  password: string
}

export async function POST(request: NextRequest) {
  const conn = await connection

  try {
    const { username, password } = await request.json();
    console.log(username);
    console.log(password);
    const [rows] = await conn.query<Users[]>("SELECT * FROM users WHERE username = ?", [username])

    if (rows.length === 0) {
      return NextResponse.json({ message: "rows none" }, { status: 401 });
    }

    const user = rows[0];

    if (password !== user.password) {
      return NextResponse.json({ message: "password error" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    await conn.end();
  }
}