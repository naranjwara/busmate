import googleIcon from '../assets/figma-register/register-google-icon.png'
import busmateLogo from '../assets/figma-register/register-logo.png'

function RegisterPage() {
  return (
    <main className="register-page">
      <section className="register-screen" aria-label="BusMate register">
        <header className="register-header">
          <img className="register-logo" src={busmateLogo} alt="BusMate" />
          <h1>Create Your Account</h1>
          <p>Join BusMate for a smoother commute.</p>
        </header>

        <form className="register-form">
          <div className="register-field">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" type="text" placeholder="John Doe" />
          </div>

          <div className="register-field">
            <label htmlFor="registerEmail">Email</label>
            <input
              id="registerEmail"
              type="email"
              placeholder="name@example.com"
            />
          </div>

          <div className="register-field register-password-block">
            <label htmlFor="registerPassword">Password</label>
            <div className="register-password-field">
              <input
                id="registerPassword"
                type="password"
                placeholder="********"
              />
              <button type="button" aria-label="Show password">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12s-3.5 6.25-9.75 6.25S2.25 12 2.25 12Z" />
                  <circle cx="12" cy="12" r="2.75" />
                </svg>
              </button>
            </div>
          </div>

          <button className="register-submit" type="submit">
            SIGN UP
          </button>

          <div className="register-divider" aria-hidden="true">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <button className="register-google-button" type="button">
            <img src={googleIcon} alt="" />
            <span>Sign up with Google</span>
          </button>
        </form>

        <footer className="register-footer">
          Already have an account? <a href="/login">Log In</a>
        </footer>
      </section>
    </main>
  )
}

export default RegisterPage
