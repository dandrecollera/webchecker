import puppeteer from "puppeteer";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const urlParams = request.nextUrl.searchParams;
  const url = urlParams.get('url') || "www.test.com";

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    ignoreDefaultArgs: [],
    timeout: 3000,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.screenshot({ path: "./screencaps/test2.png" })
  await browser.close();

  return new Response(`Captured Image URL: ${url}`);
  
}