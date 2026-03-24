const token_key = "auth_token";
const base_url = "http://localhost:3000/api/auth";
export const authService = {
    // save token
    setToken(token: string) {
    localStorage.setItem(token_key, token);
    } ,
    // get token
    getToken(){
        return localStorage.getItem(token_key)
    }, 
    // logout
    logout(){
        localStorage.removeItem(token_key);
        window.location.reload();
    },
    // check if logged in
    isAuthenticated(){
        return !!this.getToken()
    },
    async login(email:string, password:string){
        const response = await fetch(`${base_url}/login`,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        } )
        if(response.ok){
            const loginData = await response.json();
            this.setToken(loginData.token);
            return loginData.user;
        } else {
            throw new Error("Login failed");
        }
    },
    async signup(email:string, password:string){
        const response = await fetch(`${base_url}/signup`, {
            method:"POST", 
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({email,password}),
    })
    if(response.ok){
        const signupData = await response.json();
        this.setToken(signupData.token);
        return signupData.user
    } else{
        throw new Error("Signup failed");
    }
    }}