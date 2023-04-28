import { loginUser } from "~/server/services/user"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await loginUser(body)
    return {
        user
    }
})
