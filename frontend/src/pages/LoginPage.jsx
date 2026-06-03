import busmateLogo from '../assets/figma/busmate-logo.png'
import googleIcon from '../assets/figma/google-icon.png'
import { createBypassLoginToken } from '../utils/auth'

function LoginPage() {
  const handleLogin = (event) => {
    event.preventDefault()
    createBypassLoginToken()
    window.location.assign('/dashboard')
  }

  return (
    <main className="login-page">
      <section className="login-screen" aria-label="BusMate login">
        <header className="login-header">
          <img className="login-logo" src={busmateLogo} alt="BusMate" />
          <div className="login-heading">
            <h1>Welcome back</h1>
            <p>Enter your details to login</p>
          </div>
        </header>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="name@example.com" />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input id="password" type="password" placeholder="********" />
              <button type="button" aria-label="Show password">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12s-3.5 6.25-9.75 6.25S2.25 12 2.25 12Z" />
                  <circle cx="12" cy="12" r="2.75" />
                </svg>
              </button>
            </div>
          </div>

          <a className="forgot-link" href="/">
            Forgot Password?
          </a>

          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>

        <div className="divider" aria-hidden="true">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <button className="google-button" type="button">
          <img src={googleIcon} alt="" />
          <span>Continue with Google</span>
        </button>

        <footer className="login-footer">
          {"Don't have an account?"} <a href="/register">Sign Up</a>
        </footer>
      </section>
    </main>
  )
}

export default LoginPage
