document.addEventListener("dblclick", function (e) {
  e.preventDefault();
});

document.addEventListener(
  "touchstart",
  function (e) {
    if (e.target.closest(".product-card")) {
      e.preventDefault();
      e.target.closest(".product-card").classList.toggle("show-specs");
    }
  },
  { passive: false }
);

document.body.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  false
);
