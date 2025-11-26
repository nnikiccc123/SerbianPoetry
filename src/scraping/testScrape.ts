import puppeteer from "puppeteer";
import fs from "fs";

async function testScrape() {
  console.log("Pokrecem Puppeteer...");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = "https://www.poezijanoci.com/domaca/aleksa-santic-pesme.html";
  console.log(`Otvaram stranicu: ${url}`);
  await page.goto(url, { waitUntil: "networkidle2" });

  // Uzmi ime autora
  const author = await page.evaluate(() => {
    const el = document.querySelector("h1") || document.querySelector("h2");
    return el?.textContent?.trim() || "Nepoznati autor";
  });
  console.log(`Autor: ${author}`);

  // Uzmi sve pesme
  const poems = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("section[itemscope][itemtype='http://schema.org/CreativeWork']"));
    return sections.map((section, index) => ({
      id: (index + 1).toString(),
      title: section.querySelector("h3[itemprop='name']")?.textContent?.trim() || `Pesma ${index+1}`,
      content: section.querySelector("p.stihovi")?.textContent?.trim() || ""
    }));
  });

  console.log(`Pronadjeno pesama: ${poems.length}`);

  fs.writeFileSync("aleksasantic_test.json", JSON.stringify(poems, null, 2), "utf-8");
  console.log("Fajl snimljen: aleksasantic_test.json");

  await browser.close();
  console.log("Zatvoren browser.");
}

testScrape();
