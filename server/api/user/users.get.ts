import { getUsers } from "~/server/models/user"

export default defineEventHandler(async (event) => {
    const user = await getUsers()
    return {
        users: user
    }
})
