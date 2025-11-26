import puppeteer from "puppeteer";
import fs from "fs";

interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeAllPoets() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseUrl = "https://www.poezijanoci.com/domaca-poezija.html";
  console.log("Otvaram glavnu stranicu sa piscima...");
  await page.goto(baseUrl, { waitUntil: "networkidle2" });

  //  Uzmi sve pisce i njihove linkove
  const poets: { url: string; author: string }[] = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("#domaciPesnici ul li a.icon-caret-right"));
    return links.map(a => ({
      url: (a as HTMLAnchorElement).href,
      author: a.textContent?.trim() || "Nepoznati autor"
    }));
  });

  console.log(`Pronadjeno pisaca: ${poets.length}`);

  const allPoems: Poem[] = [];
  let poemId = 1;

  // Prolazak kroz svakog pisca
  for (const poet of poets) {
    console.log(`Skidam pesme od: ${poet.author}...`);
    await page.goto(poet.url, { waitUntil: "networkidle2" });

    const poems: Poem[] = await page.evaluate((author) => {
      const sections = Array.from(document.querySelectorAll("section[itemscope][itemtype='http://schema.org/CreativeWork']"));
      return sections.map((section, index) => ({
        id: "", // dodelićemo kasnije
        title: section.querySelector("h3[itemprop='name']")?.textContent?.trim() || `Pesma ${index + 1}`,
        author,
        content: section.querySelector("p.stihovi")?.textContent?.trim() || ""
      }));
    }, poet.author);

    for (const poem of poems) {
      poem.id = poemId.toString();
      allPoems.push(poem);
      poemId++;
    }

    console.log(`Pronadjeno pesama: ${poems.length}`);
    await delay(500); // mali delay da sajt ne blokira
  }

  await browser.close();

  // Snimanje svih pesama u jedan JSON fajl
  fs.writeFileSync("allpoems.json", JSON.stringify(allPoems, null, 2), "utf-8");
  console.log(`Snimljeno ukupno ${allPoems.length} pesama od ${poets.length} pisaca.`);
}

scrapeAllPoets();
