import jwt from 'jsonwebtoken';
import {CredentialError} from './Errors';

const SECRET = process.env.JWT_SECRET || 'verys3cr3t';
const EXPIRES = '2h';
const ISSUER = process.env.APP_NAME || 'my-api';

export class JwtUtils {
    static signSessionToken<T = object>(userId: string, payloadData: T): Promise<string> {
        const payload = {
            ...payloadData,
            expiresIn: EXPIRES,
            iss: ISSUER,
            sub: userId,
        };
        return Promise.resolve(
            // this JSON stringify and parse is stupid, but i don't care
            jwt.sign(JSON.parse(JSON.stringify(payload)), SECRET, {
                algorithm: 'HS256',
            })
        );
    }

    static decodeSessionToken<T>(token: string): Promise<T & {sub?: string}> {
        return new Promise<T & {sub?: string}>((resolve, reject) => {
            jwt.verify(
                token,
                SECRET,
                {
                    issuer: ISSUER,
                    algorithms: ['HS256'],
                },
                (err, decoded) => {
                    if (err) {
                        return reject(new CredentialError(err.message));
                    }
                    return resolve(decoded as T & {sub?: string});
                }
            );
        });
    }
}
