import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const url = urlParams.get('url');

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

    await page.screenshot({ path: `./public/screencaps/${fileName}` })
    await browser.close();

    return NextResponse.json({ message: 'Screenshot Captured', url, fileName });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to capture screenshot' }, { status: 500 });
  }







  return new Response(`Captured Image URL: ${url}`);

}