import { getUsers } from "~/server/models/user"

export default defineEventHandler(async (event) => {
    const user = event.context.user

    if (!user) {
        throw createError({ statusCode: 401, message: "Unauthorized" })
    }

    if (!user.role?.includes('admin')) {
        throw createError({ statusCode: 403, message: "Forbidden" })
    }

    try {
        const users = getUsers()
        const usersWithoutPasswords = users.map(({ password: _password, ...rest }) => rest)
        return { users: usersWithoutPasswords }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || "Failed to fetch users"
        })
    }
})
