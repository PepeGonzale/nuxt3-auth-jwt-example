export default defineNuxtRouteMiddleware(async (_to, from) => {
    const authUser = useAuthUser()
    if (!authUser.value) {
        return navigateTo("/login")
    }
})
