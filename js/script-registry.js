import {
  setupModelFilter,
  initProductClickHandler,
  initProductModal,
} from "./script-functions.js?v=1";
import { closeModal } from "./script-modal.js";

export function runComponentRegistry() {
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf("/") + 1);

  switch (pageName) {
    case "index.php":
      initProductModal();
      setupModelFilter('selector');
      window.closeModal = closeModal;
      break;
    case "ipad.php":
    case "iphone.php":
    case "apple_watch.php":
      initProductClickHandler();
      window.closeModal = closeModal;
      break;
    default:
      break;
  }
}
