const users: User[] = [
  {
    email: "admin@gmail-com",
    id: "8979e0f2-88e5-4995-9202-3e4035828d95",
    password: "password",
    role: ["admin"]
  },
  {
    email: "user@gmail-com",
    id: "bc12597f-1dc1-474c-b431-00ae88a67c25",
    password: "password",
    role: ["user"]
  }
]

const getUsers = (): User[] => {
  return users
}
const getUserById = (id: string) => {
  return users.find((u) => u.id === id)
}
const getUserByEmail = (email: string) => {
  return users.find(u => u.email === email)
}
export { getUsers, getUserById, getUserByEmail }
