import bcrypt from 'bcrypt';

const SALT = 10;

export class PasswordUtils {
    static hash(password: string): Promise<string> {
        return bcrypt.hash(password, SALT);
    }

    static compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
