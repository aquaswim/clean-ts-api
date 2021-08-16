import {ILoginContract} from '../Contracts/login.contract';
import {AuthSessionEntitiy} from '../Entity/AuthSession.entitiy';
import {IAuthRepositoryContract} from '../Repositories/auth.repository.contract';
import {CredentialError, NotFoundError} from '../../../commons/Errors';
import {PasswordUtils} from '../../../commons/password.utils';
import {JwtUtils} from '../../../commons/jwt.utils';
import {autoInjectable, inject} from 'tsyringe';

const expiry = (Number(process.env.SESSION_EXPIRY) || 60) * 60000;

@autoInjectable()
export default class LoginUsecase implements ILoginContract {
    constructor(@inject('AuthRepository') private authRepository?: IAuthRepositoryContract) {}
    async loginWithUsernameAndPassword(username?: string, password?: string): Promise<AuthSessionEntitiy> {
        // get user by username from datastore
        const userData = await this.authRepository!.getUserByUsername(username!);
        if (userData) {
            // user data found
            // compare the password
            if (await PasswordUtils.compare(password!, userData.passwordHashed)) {
                return new AuthSessionEntitiy({
                    refreshToken: '',
                    sessionToken: await JwtUtils.signSessionToken(userData.id, {username: userData.username}),
                    expiredAt: Date.now() + expiry,
                });
            }
            throw new CredentialError('Password not match');
        }
        throw new NotFoundError('User not found');
    }
}
