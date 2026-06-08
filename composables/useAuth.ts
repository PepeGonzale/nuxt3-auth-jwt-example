export const useAuth = () => {
    const authUser = useAuthUser()
    const userAdmin = useState<boolean>('userAdmin', () => false)

    const setUser = (user: User | null) => {
        authUser.value = user
    }

    const login = async (user: UserInput) => {
        try {
            const data = await $fetch('/api/user', {
                method: 'POST',
                body: user
            })
            userAdmin.value = !!data.isAdmin
            setUser(data.user)
            return data
        } catch (err: any) {
            throw err
        }
    }

    const userLoggedIn = async () => {
        if (!authUser.value) {
            try {
                const data = await $fetch('/api/user/token', {
                    headers: useRequestHeaders(['cookie'])
                })
                setUser(data.user ?? null)
                userAdmin.value = data.user?.role?.includes('admin') ?? false
                return data
            } catch {
                setUser(null)
                userAdmin.value = false
            }
        }
    }

    const logout = async () => {
        const data = await $fetch('/api/user/logout')
        userAdmin.value = false
        setUser(null)
        return data
    }

    const register = async (user: UserInput) => {
        try {
            const data = await $fetch('/api/user/register', {
                method: 'POST',
                body: user
            })
            userAdmin.value = !!data.isAdmin
            setUser(data.user)
            return data
        } catch (err: any) {
            throw err
        }
    }

    return {
        login,
        register,
        userLoggedIn,
        userAdmin,
        logout,
        authUser
    }
}
