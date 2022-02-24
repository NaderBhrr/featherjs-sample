import bcrypt from "bcrypt";

export async function generate_hash(plainText: string) {
    const hashedPassword = await bcrypt.hash(plainText, 10);

    return hashedPassword
}

export async function assertHashedPassword(plainText: string, hashedPassword: string) {
    const result = await bcrypt.compare(plainText, hashedPassword);

    return result
}