const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log("🌐 Extrayendo datos de InstaKash...");
    const instaKash = await getInstaKashRate(page);

    console.log("🌐 Extrayendo datos de Rextie...");
    const rextie = await getRextieRate(page);

    const data_tipo_cambio =
      `💵 *Tipos de cambio actualizados*:\n\n` +
      `• InstaKash: S/ ${instaKash}\n` +
      `• Rextie: S/ ${rextie}`;

    console.log("📊 Datos obtenidos:", data_tipo_cambio);

    await sendToZohoCliq(data_tipo_cambio);
  } catch (error) {
    console.error("⛔ Error en el proceso principal:", error.message);

    await page.screenshot({ path: "error.png", fullPage: true });
    const html = await page.content();
    fs.writeFileSync("page.html", html);
    console.log("📸 Captura y HTML guardados para diagnóstico");
  } finally {
    await browser.close();
    console.log("🔴 Navegador cerrado");
  }
})();

async function getInstaKashRate(page) {
  try {
    await page.goto("https://instakash.net/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForFunction(
      () => {
        return (
          document.body.textContent.includes("S/") ||
          document.body.textContent.includes("Tipo de cambio")
        );
      },
      { timeout: 15000 }
    );

    return await page.evaluate(() => {
      const text = document.body.textContent;
      const pattern = /S\/\s*(\d+\.\d{2})/;
      const match = text.match(pattern);
      return match ? match[1] : "0.00";
    });
  } catch (error) {
    console.error("⚠️ Error al obtener InstaKash:", error.message);
    return "Error";
  }
}

async function getRextieRate(page) {
  try {
    await page.goto("https://www.rextie.com/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForFunction(
      () => {
        return (
          document.body.textContent.includes("S/") ||
          document.body.textContent.includes("Compra") ||
          document.body.textContent.includes("Venta")
        );
      },
      { timeout: 15000 }
    );

    return await page.evaluate(() => {
      const specificElement = document.querySelector(
        ".sell .amount, .buy .amount, .rate-value"
      );
      if (specificElement) {
        return specificElement.textContent.trim().replace("S/", "").trim();
      }

      const text = document.body.textContent;
      const pattern = /S\/\s*(\d+\.\d{2})/;
      const matches = text.match(pattern);
      return matches ? matches[1] : "0.00";
    });
  } catch (error) {
    console.error("⚠️ Error al obtener Rextie:", error.message);
    return "Error";
  }
}

async function sendToZohoCliq(message) {
  try {
    console.log("🔑 Autenticando con Zoho...");
    const tokenResponse = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          refresh_token:
            "1000.cc802231c73a1768ce5b5a7e2c8a5910.884dd6e34e49b3fa428a7e29e6a24486",
          grant_type: "refresh_token",
          client_id: "1000.IBGVIUDXKK95UN8H5XBMF4JVEJ78YF",
          client_secret: "a4c16fb5b7402da131d9aade31221a19dc2656cb83",
        },
      }
    );

    console.log("🚀 Enviando mensaje a Zoho Cliq...");
    await axios.post(
      "https://cliq.zoho.com/api/v2/channelsbyname/testbuho/message",
      { text: message },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${tokenResponse.data.access_token}`,
        },
      }
    );

    console.log("✅ Mensaje enviado exitosamente");
  } catch (error) {
    console.error(
      "⛔ Error al enviar a Zoho Cliq:",
      error.response?.data || error.message
    );
    throw error;
  }
}
