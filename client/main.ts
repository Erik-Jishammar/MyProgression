import { renderFooter } from "./components/footer.js";
import { navigateTo } from "./app.js";

window.addEventListener("DOMContentLoaded", () => {
  renderFooter();

  // Initial navigation handles navbar rendering
  navigateTo("log");
});
