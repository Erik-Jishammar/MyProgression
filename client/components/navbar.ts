import { navigateTo } from "../app.js";
import {authService} from "../services/authService.js";
export function renderNavbar(): void {
  const nav = document.getElementById("navbar") as HTMLElement;

  const isLoggedIn = authService.isAuthenticated();
  if(!isLoggedIn){
    nav.innerHTML = "";
    return;
  }
  nav.innerHTML = `
      <ul class="navbar">
        <li><button class="nav-button" data-view="log"><i class="fa-solid fa-dumbbell"></i> Log</button></li>
        <li><button class="nav-button" data-view="history"><i class="fa-solid fa-chart-line"></i> History</button></li>
        <li><button class="nav-button" data-view="profile"><i class="fa-solid fa-user"></i> Profile</button></li>
        <li><button class="nav-button" data-view="generator"><i class="fa-solid fa-plus"></i> Generator</button></li>
        <li><button class="nav-button" data-view="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button></li>
      </ul>
    `;
  nav.querySelectorAll<HTMLButtonElement>(".nav-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll<HTMLButtonElement>(".nav-button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.dataset.view;
      if (view === "logout") {
        if(confirm("Are you sure you want to logout?")){
          authService.logout();
          navigateTo("login");
        }
        return;
      }
      if (view) {
        navigateTo(view);
      }
    });
  });
}
