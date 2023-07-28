import { getUserToken } from "../utils/session"

export default defineEventHandler(async (event) => {
    // ...
    const user = await getUserToken(event)
    console.log(user);
    
    if (!user) {
        event.context.user = null
    }
    if (user) {
        event.context.user = user
    }
})
