import { getUserToken } from "../utils/session"
import { getUserById } from "../models/user"

export default defineEventHandler(async (event) => {
    const tokenPayload = await getUserToken(event)
    
    if (!tokenPayload) {
        event.context.user = null
        return
    }

    // Obtener el usuario completo desde la base de datos usando el ID del token
    const user = getUserById(tokenPayload.id)
    
    if (!user) {
        event.context.user = null
        return
    }

    // Remover la contraseña antes de agregar al contexto
    const { password: _password, ...userWithoutPassword } = user
    event.context.user = userWithoutPassword
})
