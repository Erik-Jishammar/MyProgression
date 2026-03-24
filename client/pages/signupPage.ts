export function renderSignupPage(container: HTMLElement): void {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card glass">
        <h2>Signup</h2>
        
        <form id="signup-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required>
          </div>
          
          <button type="submit" class="auth-btn">Signup</button>
        </form>
        
       
    
    </div>
  `;
}