export default defineEventHandler((event) => {
    deleteCookie(event, '__session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
    
    return {
        user: null,
        message: "Logged out successfully"
    }
})