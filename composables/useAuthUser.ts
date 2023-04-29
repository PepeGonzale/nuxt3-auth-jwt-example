export const useAuthUser = () => {
    return useState<UserWithoutPassword | null>('user', () => null)
}
