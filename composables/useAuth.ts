export const useAuth = () => {
    const login = async (user: UserInput) => {
        try {
            const data = await $fetch('/api/user', {
                method: 'POST',
                body: user
            })
            return data
        } catch (err) {
            return null
        }
    }
    return {
        login
    }
}
