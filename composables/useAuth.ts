export const useAuth = () => {
    const authUser = useAuthUser()
    const setUser = (user: User) => {
        authUser.value = user
    }
    const login = async (user: UserInput) => {
        try {
            const data = await $fetch('/api/user', {
                method: 'POST',
                body: user
            })
            setUser(data.user)
            return data
        } catch (err) {
            return null
        }
    }
    return {
        login
    }
}
