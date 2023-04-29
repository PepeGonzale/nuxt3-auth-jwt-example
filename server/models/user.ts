const users: User[] = [
  {
    email: "admin@gmail.com",
    id: "8979e0f2-88e5-4995-9202-3e4035828d95",
    password: "$2a$10$q9RCHgoDplabHe/iq5HkduFSe6/o3DLjmkW6b8j6AyLpPIvwqRpeq",
    role: ["admin"]
  },
  {
    email: "user@gmail.com",
    id: "bc12597f-1dc1-474c-b431-00ae88a67c25",
    password: "$2a$10$3zU3itd/AiI8XBtx8W.HreBBtJdUlGP0GE0Os3/hbceXjYjmtj6HG",
    role: ["user"]
  }
]

const getUsers = (): User[] => {
  return users
}
const getUserById = (id: string) => {
  return users.find(u => u.id === id)
}
const getUserByEmail = (email: string) => {
  return users.find(u => u.email === email)
}
export { getUsers, getUserById, getUserByEmail }
