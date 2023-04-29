import jwt from "jsonwebtoken"
const createToken = async (user: User) => {
  const config = useRuntimeConfig()
  return await jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    config.tokenSecret,

    {
      expiresIn: config.tokenExpiration
    }
  )
}
const verifyToken = async (token: string) => {
  const config = useRuntimeConfig()
  return await jwt.verify(token, config.tokenSecret)
}

const getUserToken = (event) => {
  const cookie = getCookie(event, "token")
  if (!cookie) {
    return null
  }
  const token = verifyToken(cookie)
  if (!token) {
    return null
  }
  return token
}
export { createToken, getUserToken }
