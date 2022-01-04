
import bcrypt from 'bcryptjs';
export class password {
    static async toHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
        }

    static async compare(suppliedPassword: string, storedPassword: string): Promise<boolean> {
        return await bcrypt.compare(suppliedPassword, storedPassword);
    }
}