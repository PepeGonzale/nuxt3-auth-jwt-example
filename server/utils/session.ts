import { sign } from "jsonwebtoken"
const createToken = (user: User) => {
  const config = useRuntimeConfig()
  return sign(
    {
      id: user.id
    },
    config.tokenSecret,

    {
      expiresIn: config.tokenExpiration
    }
  )
}
export { createToken }
