import jwt from "jsonwebtoken"
import type { H3Event } from "h3"

interface TokenPayload {
  id: string
  email: string
}

const createToken = async (user: User): Promise<string> => {
  const config = useRuntimeConfig()
  const secret = config.tokenSecret as string
  const expiresIn = config.tokenExpiration as string || "7d"
  
  if (!secret) {
    throw new Error("TOKEN_SECRET is not configured")
  }

  return await jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    secret,
    {
      expiresIn
    }
  )
}

const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const config = useRuntimeConfig()
    const secret = config.tokenSecret as string
    
    if (!secret) {
      throw new Error("TOKEN_SECRET is not configured")
    }

    const decoded = await jwt.verify(token, secret) as TokenPayload
    return decoded
  } catch (err) {
    return null
  }
}

const getUserToken = async (event: H3Event): Promise<TokenPayload | null> => {
  const cookie = getCookie(event, "__session")
  if (!cookie) {
    return null
  }
  const token = await verifyToken(cookie)
  return token
}

export { createToken, getUserToken, verifyToken }
export type { TokenPayload }
