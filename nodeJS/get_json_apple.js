const puppeteer = require("puppeteer");
const fs = require("fs");
const UserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(UserAgent);
  await page.goto("https://www.apple.com/shop/refurbished/mac");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = await page.evaluate(() =>
    JSON.stringify(window.REFURB_GRID_BOOTSTRAP)
  );

  await browser.close();

  fs.writeFile(
    "C:/xampp/htdocs/macbuho/json/mac.json",
    data,
    function (err) {
      if (err) return console.log(err);
      console.log("Datos de Mac extraídos correctamente.");
    }
  );
})();

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(UserAgent);
  await page.goto("https://www.apple.com/shop/refurbished/ipad");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = await page.evaluate(() =>
    JSON.stringify(window.REFURB_GRID_BOOTSTRAP)
  );

  await browser.close();

  fs.writeFile(
    "C:/xampp/htdocs/macbuho/json/ipad.json",
    data,
    function (err) {
      if (err) return console.log(err);
      console.log("Datos de iPad extraídos correctamente.");
    }
  );
})();
