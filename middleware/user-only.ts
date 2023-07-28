export default defineNuxtRouteMiddleware(async () => {
    const authUser = useAuthUser()
    
    if (!authUser.value) {
        return navigateTo({ name: "login" })
    }
})
