import { getUserByEmail } from "../models/user"

const loginUser = (user: User) => {
  const checkUser = getUserByEmail(user.email)
  return checkUser
}
export { loginUser }
