import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';

async function InsertToDB(fileName: string, title: string, url: string, isWordPress: boolean) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  try {
    const sql = 'INSERT INTO `images` (title, filename, url, wordpress) VALUES (?, ?, ?, ?)';
    await connection.query(sql, [title, fileName, url, isWordPress]);
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
}

export async function POST(request: NextRequest) {
  const { url, title } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
      ignoreDefaultArgs: [],
      timeout: 3000,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url, { waitUntil: "networkidle2" });

    let time = new Date().getTime().toString();
    let fileName = time + '.png';

    await page.screenshot({ path: `./public/screencaps/${fileName}` });
    await browser.close();


    const wpLoginUrl = `${url}/wp-login.php`;
    let isWordPress = false;

    try {
      const response = await fetch(wpLoginUrl, { method: 'HEAD' });
      if (response.status === 200) {
        isWordPress = true;
      }
    } catch (error) {
      console.log('Error checking WordPress:', error)
    }

    await InsertToDB(fileName, title, url, isWordPress);

    return NextResponse.json({ message: 'Screenshot Captured', url, fileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to capture screenshot' }, { status: 500 });
  }
}
