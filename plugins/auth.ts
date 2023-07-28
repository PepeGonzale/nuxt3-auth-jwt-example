export default defineNuxtPlugin(async () => {
    const { userLoggedIn } = await useAuth()
    const user = useAuthUser()
    await userLoggedIn()
    console.log(user.value)
})
