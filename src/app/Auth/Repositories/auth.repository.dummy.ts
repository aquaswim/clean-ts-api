import {IAuthRepositoryContract} from './auth.repository.contract';
import {UserDataEntity} from '../Entity/UserData.entity';
import {PasswordUtils} from '../../../commons/password.utils';

export class AuthRepositoryDummy implements IAuthRepositoryContract {
    async getUserByUsername(username: string): Promise<UserDataEntity | null> {
        switch (username) {
            case 'rei_ayanami@example.com':
                return new UserDataEntity({
                    id: 'someofmyid',
                    username: username,
                    passwordHashed: await PasswordUtils.hash('password'),
                    registerDate: new Date(),
                });
            default:
                return null;
        }
    }
}
