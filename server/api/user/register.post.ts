import { registerUser } from "~/server/services/user"
import { createToken } from "~/server/utils/session"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<UserInput>(event)
        
        if (!body.email || !body.password) {
            throw createError({
                statusCode: 400,
                message: "Email and password are required"
            })
        }

        if (body.password.length < 6) {
            throw createError({
                statusCode: 400,
                message: "Password must be at least 6 characters long"
            })
        }

        const user = await registerUser(body)
        const token = await createToken(user)
        
        setCookie(event, "__session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        // Remover la contraseña de la respuesta
        const { password: _password, ...userWithoutPassword } = user
        
        return {
            user: userWithoutPassword,
            token,
            isAdmin: false
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 400,
            message: error.message || "Registration failed"
        })
    }
})

