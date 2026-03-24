import {navigateTo} from "../app.js";
import {authService} from "../services/authService.js";

export function initLoginController():void {
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
 
  
  if (loginForm){
    loginForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();
      const email = (document.getElementById("email") as HTMLInputElement)
      const password = (document.getElementById("password") as HTMLInputElement);

      try{
        await authService.login(email.value, password.value);
        alert("Login Sucessful")
        navigateTo("log");
      } catch (error) {
        alert("Login failed! Check your email or password");
          console.error("Login detail: ", error);
      }
    });
  }  
}