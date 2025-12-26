import { getUserByEmail, createUser } from "../models/user"
import { verifyPassword, hashPassword } from "../utils/password"

const loginUser = async (user: User) => {
  const checkUser = getUserByEmail(user.email)
  if (!checkUser) {
    throw new Error("User not found")
  }
  const checkPassword = await verifyPassword(user.password, checkUser.password)
  if (!checkPassword) {
    throw new Error("Password is incorrect")
  }

  return checkUser
}

const registerUser = async (user: UserInput) => {
  const existingUser = getUserByEmail(user.email)
  if (existingUser) {
    throw new Error("User already exists")
  }
  
  const hashedPassword = await hashPassword(user.password)
  const newUser = createUser(user.email, hashedPassword)
  
  return newUser
}

export { loginUser, registerUser }
