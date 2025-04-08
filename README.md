# MacBuho Web Scraper

Este proyecto realiza un scraping de prueba del sitio [Apple](https://www.apple.com/) utilizando **Node.js** y **Puppeteer**, extrayendo datos de productos Apple (como iPads y Macs) y almacenándolos como archivos `.json`.

## 📁 Estructura del Proyecto

```
MACBUHO/
├── css/
│   ├── style.css
│   └── style-modal.css
├── fonts/
│   └── SF-Pro-Display-Regular.woff
├── images/
├── js/
│   ├── mobile.js
│   ├── script-functions.js
│   ├── script-registry.js
│   └── script.js
├── json/
│   ├── applewatch.json
│   ├── iphone.json
│   ├── ipad.json
│   └── mac.json
├── json_test/
├── nodeJS/
│   ├── get_json_apple.js        # Script principal de scraping
│   ├── tipo_de_cambio.js        # Obtiene tipo de cambio
│   ├── package.json
│   └── package-lock.json
├── security/
├── .gitignore
├── index.php
├── ipad.php
├── iphone.php
├── apple_watch.php
├── README.md
├── robots.txt
├── section_footer.php
└── section_head.php
```

## 🚀 Funcionalidad

- **Scraping con Puppeteer**: `get_json_apple.js` navega en segundo plano hacia el sitio de Apple y extrae nombres y precios de dispositivos Apple.
- **Exportación de datos**: Los resultados se guardan como archivos `.json` separados (por ejemplo: `ipad.json`, `mac.json`, `iphone.json`, `applewatch.json`) dentro del directorio `/json`.
- **PHP Frontend**: Los archivos `.php` permiten mostrar o manipular esos datos posiblemente en una interfaz web.
- **Tipo de cambio**: El script `tipo_de_cambio.js` podría estar relacionado con la conversión de precios a otra moneda.

## 📦 Instalación

1. Asegúrate de tener **Node.js** instalado.
2. Entra al directorio `nodeJS`:

```bash
cd nodeJS
npm install
```

Esto instalará Puppeteer y demás dependencias.

## ▶️ Uso

Desde el directorio `nodeJS`, ejecuta el script de scraping:

```bash
node get_json_apple.js
```

Este proceso:

- Lanza una instancia de navegador headless.
- Navega por las secciones correspondientes (Mac, iPad, etc.).
- Extrae datos y los guarda como `.json` en el directorio `/json`.

## 🧪 Ejemplo de Salida (`json/ipad.json`)

```json
[
  {
    "nombre": "iPad Pro 11\" M2 128GB",
    "precio": "$19,999"
  },
  {
    "nombre": "iPad Air 10.9\" 64GB",
    "precio": "$13,999"
  }
]
```

## ⚠️ Notas

- Este proyecto es **experimental** y para fines educativos.
- El scraping debe hacerse con responsabilidad y cumpliendo los términos de uso del sitio web.
- Puedes extender el sistema para incluir base de datos o exportación a CSV si lo deseas.

## 📄 Licencia

Uso libre para fines académicos y de aprendizaje.
