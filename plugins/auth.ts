export default defineNuxtPlugin(async () => {
    const { userLoggedIn } = useAuth()
    await userLoggedIn()
})
