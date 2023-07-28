export default defineNuxtRouteMiddleware(async (_to, from) => {
    const authUser = useAuthUser()
    console.log('auth',authUser.value)
    if (!authUser.value || authUser.value === null) {
        return navigateTo("/login")
    }
})
