export default defineNuxtPlugin(async () => {
    const { userLoggedIn } = await useAuth()
    const user = useAuthUser()
    await userLoggedIn()
    
})
