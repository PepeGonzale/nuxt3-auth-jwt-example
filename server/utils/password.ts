import bcrypt from "bcryptjs"

export const verifyPassword = async (password: string, hash: string) => {
    const compare = await bcrypt.compare(password, hash)
    if (!compare) {
        throw new Error('Password does not match')
    }
    return compare
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}
