// app/api/instagram/route.ts
import { NextResponse } from "next/server";
import puppeteer, { Browser, Page } from "puppeteer"; // Use puppeteer-core and @sparticuz/chromium in production
import { cache } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const cachedScrape = cache(async () => {
  let browser: Browser | undefined;
  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    ];
    await page.setUserAgent(
      userAgents[Math.floor(Math.random() * userAgents.length)]
    );

    // Bypass headless detection
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });

    async function navigateWithRetry(page: Page, url: string, maxRetries = 3) {
      for (let i = 0; i < maxRetries; i++) {
        try {
          console.log(`Attempt ${i + 1}: Navigating to ${url}`);
          await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
          console.log("Navigation complete");
          return true;
        } catch (error) {
          if (error instanceof Error && error.message.includes("429") && i < maxRetries - 1) {
            const delayTime = 5000 * (i + 1);
            console.log(
              `429 error, retrying in ${delayTime / 1000} seconds...`
            );
            await delay(delayTime);
            continue;
          }
          throw error;
        }
      }
    }

    await navigateWithRetry(page, "https://www.instagram.com/nawa.fuku/");
    await delay(5000);
    await page.mouse.move(100, 100);
    await page.evaluate(async () => {
      for (let i = 0; i < 3; i++) {
        window.scrollBy(0, window.innerHeight);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    });

    console.log("Extracting content...");
    const pageHtml = await page.content();
    console.log("Page HTML snippet:", pageHtml.slice(0, 500));

    await page.waitForSelector("img", { timeout: 10000 });
    const profilePicUrl = await page.evaluate(() => {
      const img = document.querySelector(
        'header img, img[alt*="profile picture"], div._aa_m img'
      );
      return img ? `/api/image-proxy?url=${encodeURIComponent(img.src)}` : null;
    });

    const posts = await page.evaluate(() => {
      const images: Array<{ imageUrl: string; caption: string }> = [];
      const postImgs = document.querySelectorAll(
        'div._aagv img, div[role="presentation"] img, img.x5yr21d'
      );
      console.log("Found post imgs:", postImgs.length);
      postImgs.forEach((img) => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") || "Instagram post";
        if (src && (src.includes("cdninstagram") || src.includes("fbcdn.net"))) {
          images.push({
            imageUrl: `/api/image-proxy?url=${encodeURIComponent(src)}`,
            caption: alt,
          });
        }
      });
      return images.slice(0, 10);
    });

    console.log(`Found ${posts.length} posts`);

    await browser.close();

    return { profilePicUrl, posts };
  } catch (error) {
    console.error("Error details:", error instanceof Error ? error.message : "Unknown error", error instanceof Error ? error.stack : "");
    if (browser) await browser.close();
    throw error;
  }
});

export async function GET() {
  try {
    const result = await cachedScrape();
    return NextResponse.json(result, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      {
        profilePicUrl: null,
        posts: [],
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to scrape Instagram content",
      },
      { status: 500 }
    );
  }
}
