// app/api/instagram/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.instagram.com/nawa.fuku/", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.waitForSelector("img");
    const profilePicUrl = await page.evaluate(() => {
      const img = document.querySelector(
        "img[alt$='profile picture']"
      ) as HTMLImageElement | null;
      return img ? img.src : null;
    });

    const posts = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((img) => img.alt.startsWith("Photo by"))
        .map((img) => ({
          // Use the proxy URL instead of direct Instagram URL
          imageUrl: `/api/image-proxy?url=${encodeURIComponent(img.src)}`,
          caption: img.alt,
        }))
    );

    await browser.close();

    return NextResponse.json(
      { profilePicUrl, posts },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json([], { status: 500 });
  }
}
