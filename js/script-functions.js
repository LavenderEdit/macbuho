function openProductModal(
  productTitle,
  modal,
  productNameText,
  whatsappBtn,
  WHATSAPP_NUMBER
) {
  productNameText.textContent = productTitle;

  const encodedMessage = encodeURIComponent(
    `Hola, estoy interesado en este producto: ${productTitle}`
  );
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  modal.classList.add("show");
}

function initProductCards(
  modal,
  productNameText,
  whatsappBtn,
  WHATSAPP_NUMBER
) {
  const productCards = document.querySelectorAll(".product");

  productCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title") || "producto";
      openProductModal(
        title,
        modal,
        productNameText,
        whatsappBtn,
        WHATSAPP_NUMBER
      );
    });
  });
}

// Manejar modal para mac
export function initProductModal() {
  const WHATSAPP_NUMBER = "51958957066";

  const modal = document.getElementById("whatsappModal");
  const productNameText = document.querySelector("#productMessage strong");
  const whatsappBtn = document.getElementById("whatsappLink");

  initProductCards(modal, productNameText, whatsappBtn, WHATSAPP_NUMBER);
}

// Manejar modal para ipad, iphone y apple watch
export function initProductClickHandler() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
  });
}

function handleCardClick(cardElement) {
  const productName =
    cardElement.getAttribute("data-product") || "Producto desconocido";
  const whatsappNumber = "51958957066";
  const message = `Hola, estoy interesado en el siguiente producto: ${productName}`;
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  document.querySelector("#productMessage strong").textContent = productName;
  document.getElementById("whatsappLink").href = whatsappURL;

  const modal = document.getElementById("whatsappModal");
  modal.classList.add("show");
}

// Manejar Filtro de Modelos en index.php
export function setupModelFilter(selectorId) {
  const selector = document.querySelector(`#${selectorId}`);
  if (!selector) return;

  const imac = document.querySelectorAll(".imac");
  const macmini = document.querySelectorAll(".macmini");
  const macbookair = document.querySelectorAll(".macbookair");
  const macbookpro = document.querySelectorAll(".macbookpro");
  const imacpro2017 = document.querySelectorAll(".imacpro2017");
  const macpro = document.querySelectorAll(".macpro");

  selector.addEventListener("change", ocultar_mostrar);

  function ocultar_mostrar() {
    switch (selector.value) {
      case "imac":
        mostrar(imac);
        ocultar([macmini, macbookair, macbookpro, imacpro2017, macpro]);
        break;
      case "macmini":
        mostrar(macmini);
        ocultar([imac, macbookair, macbookpro, imacpro2017, macpro]);
        break;
      case "macbookair":
        mostrar(macbookair);
        ocultar([imac, macmini, macbookpro, imacpro2017, macpro]);
        break;
      case "macbookpro":
        mostrar(macbookpro);
        ocultar([imac, macmini, macbookair, imacpro2017, macpro]);
        break;
      case "imacpro2017":
        mostrar(imacpro2017);
        ocultar([imac, macmini, macbookair, macbookpro, macpro]);
        break;
      case "macpro":
        mostrar(macpro);
        ocultar([imac, macmini, macbookair, macbookpro, imacpro2017]);
        break;
      default:
        mostrar(imac);
        mostrar(macmini);
        mostrar(macbookair);
        mostrar(macbookpro);
        mostrar(imacpro2017);
        mostrar(macpro);
    }
  }

  function ocultar(grupos) {
    grupos.forEach((grupo) => {
      if (grupo) {
        grupo.forEach((elemento) => {
          if (elemento) elemento.style.display = "none";
        });
      }
    });
  }

  function mostrar(grupo) {
    if (grupo) {
      grupo.forEach((elemento) => {
        if (elemento) elemento.style.display = "block";
      });
    }
  }
}
