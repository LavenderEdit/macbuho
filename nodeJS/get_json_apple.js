const puppeteer = require("puppeteer");
const fs = require("fs");
const UserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0";

async function scrapData() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(UserAgent);

  await page.goto("https://www.apple.com/shop/refurbished/mac");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const macData = await page.evaluate(() =>
    JSON.stringify(window.REFURB_GRID_BOOTSTRAP)
  );
  fs.writeFile(
    "C:/xampp/htdocs/macbuho/json/mac.json",
    macData,
    function (err) {
      if (err) return console.log(err);
      console.log("Datos de Mac extraídos correctamente.");
    }
  );

  await page.goto("https://www.apple.com/shop/refurbished/ipad");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const ipadData = await page.evaluate(() =>
    JSON.stringify(window.REFURB_GRID_BOOTSTRAP)
  );
  fs.writeFile(
    "C:/xampp/htdocs/macbuho/json/ipad.json",
    ipadData,
    function (err) {
      if (err) return console.log(err);
      console.log("Datos de iPad extraídos correctamente.");
    }
  );

  await page.goto("https://www.apple.com/shop/refurbished/iphone");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const iphoneData = await page.evaluate(() =>
    JSON.stringify(window.REFURB_GRID_BOOTSTRAP)
  );
  fs.writeFile(
    "C:/xampp/htdocs/macbuho/json/iphone.json",
    iphoneData,
    function (err) {
      if (err) return console.log(err);
      console.log("Datos de iPhone extraídos correctamente.");
    }
  );

  await page.goto("https://www.apple.com/shop/refurbished/watch");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const watchData = await page.evaluate(() =>
    JSON.stringify(window.REFURB_GRID_BOOTSTRAP)
  );
  fs.writeFile(
    "C:/xampp/htdocs/macbuho/json/applewatch.json",
    watchData,
    function (err) {
      if (err) return console.log(err);
      console.log("Datos de Apple Watch extraídos correctamente.");
    }
  );

  await browser.close();
}

scrapData();
// setInterval(scrapData, 15 * 60 * 1000); // 15 minutos
// setInterval(scrapData, 3 * 60 * 60 * 1000); // 3 horas
