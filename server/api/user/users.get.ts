import { getUsers } from "~/server/models/user"

export default defineEventHandler(async (event) => {
    try {
        const users = getUsers()
        
        // Remover contraseñas de todos los usuarios
        const usersWithoutPasswords = users.map(({ password: _password, ...user }) => user)
        
        return {
            users: usersWithoutPasswords
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || "Failed to fetch users"
        })
    }
})
