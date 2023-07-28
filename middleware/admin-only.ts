export default defineNuxtRouteMiddleware(async (_to, from) => {
    const { userAdmin  } = useAuth()
    if (!userAdmin.value) {
        return navigateTo({name: "login"})
    }
})
