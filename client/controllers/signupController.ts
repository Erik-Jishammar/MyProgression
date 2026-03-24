import {navigateTo} from "../app.js";
import {authService} from "../services/authService.js";

export function initSignupController():void {
    const signupForm = document.getElementById("signup-form") as HTMLFormElement;

    if(signupForm){
        signupForm.addEventListener("submit", async (e: Event)=> {
            e.preventDefault();
            const email = (document.getElementById("email") as HTMLInputElement);
            const password = (document.getElementById("password") as HTMLInputElement);

            try{
                await authService.signup(email.value, password.value);
                alert("Signup successful!");
                navigateTo("login");
            } catch (error){
                alert("Signup failed! Email may be taken.");
                console.error("Signup error: ", error);
            }
        });
    }
    
}
