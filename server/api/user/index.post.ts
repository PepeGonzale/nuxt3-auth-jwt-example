import { loginUser } from "~/server/services/user"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await loginUser(body)
    const token = await createToken(user)
    setCookie(event, "__session", token)
    return {
        user,
        token
    }
})
