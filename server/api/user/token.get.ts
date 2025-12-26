export default defineEventHandler((event) => {
    const user = event.context.user as UserWithoutPassword | null
    
    if (!user) {
        return {
            user: null
        }
    }
    
    return {
        user
    }
})
