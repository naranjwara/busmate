const AUTH_COOKIE_NAME = 'busmate_auth_token'
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24

export const getAuthToken = () => {
  const cookies = document.cookie.split('; ')
  const authCookie = cookies.find((cookie) =>
    cookie.startsWith(`${AUTH_COOKIE_NAME}=`),
  )

  return authCookie ? decodeURIComponent(authCookie.split('=')[1]) : ''
}

export const isAuthenticated = () => Boolean(getAuthToken())

export const createBypassLoginToken = () => {
  const randomValue =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  const token = `busmate-dev-${randomValue}`

  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(
    token,
  )}; Max-Age=${TOKEN_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`

  return token
}
