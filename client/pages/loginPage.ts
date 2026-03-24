export function renderLoginPage(container: HTMLElement): void {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card glass">
        <h2>Login</h2>
        
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required>
          </div>
          
          <button type="submit" class="auth-btn">Login</button>
        </form>
        
        <p class="auth-footer">
          Don't have an account? <a href="#" id="go-to-signup">Sign up here</a>
        </p>
      </div>
    </div>
  `;
}