
const createToken = (user: User) => {
  const config = useRuntimeConfig()
  return sign(
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
export { createToken }
