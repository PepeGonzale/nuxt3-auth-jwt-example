import { getUserByEmail } from "../models/user"
import { verifyPassword } from "../utils/password"

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

export { loginUser }
