import { renderLogPage } from "./pages/logPage.js";
import { renderTrainingHistoryPage } from "./pages/trainingHistoryPage.js";
import { renderPassGeneratorPage } from "./pages/passGeneratorPage.js";
import { renderProfilePage } from "./pages/profilePage.js";
import { renderLoginPage } from "./pages/loginPage.js";
import {initLoginController} from "./controllers/loginController.js";
import {authService} from "./services/authService.js";
const views: Record<string, (container: HTMLElement) => void> = {
  log: renderLogPage,
  history: renderTrainingHistoryPage,
  generator: renderPassGeneratorPage,
  profile: renderProfilePage,
  login: renderLoginPage,
};

export function navigateTo(page: string) {

  if(page !== "login" && !authService.isAuthenticated()){
    return navigateTo("login");
  }

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";
  const render = views[page];
  if (render) {
    render(app);

    if (page === "login") {
      initLoginController();
    }
  } else {
    app.innerHTML = "<h2>Page not found</h2>";
  }
}
