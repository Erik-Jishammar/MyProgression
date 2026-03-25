import { renderLogPage } from "./pages/logPage.js";
import { renderTrainingHistoryPage } from "./pages/trainingHistoryPage.js";
import { renderPassGeneratorPage } from "./pages/passGeneratorPage.js";
import { renderProfilePage } from "./pages/profilePage.js";
import { renderLoginPage } from "./pages/loginPage.js";
import {initLoginController} from "./controllers/loginController.js";
import {authService} from "./services/authService.js";
import { renderSignupPage } from "./pages/signupPage.js";
import {initSignupController} from "./controllers/signupController.js";
import { renderNavbar } from "./components/navbar.js";

const views: Record<string, (container: HTMLElement) => void> = {
  log: renderLogPage,
  history: renderTrainingHistoryPage,
  generator: renderPassGeneratorPage,
  profile: renderProfilePage,
  login: renderLoginPage,
  signup: renderSignupPage,
};

export function navigateTo(page: string) {

  if(page !== "login" && page !== "signup" && !authService.isAuthenticated()){
    return navigateTo("login");
  }

  renderNavbar();

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";
  const render = views[page];
  if (render) {
    render(app);

    if (page === "login") {
      initLoginController();
    }
    if (page === "signup") {
      initSignupController();
    }
  } else {
    app.innerHTML = "<h2>Page not found</h2>";
  }
}
