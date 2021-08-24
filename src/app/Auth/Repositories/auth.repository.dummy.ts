import {IAuthRepositoryContract} from '../Contracts/auth.repository.contract';
import {UserDataEntity} from '../Entity/UserData.entity';
import {PasswordUtils} from '../../../commons/password.utils';
import crypto from 'crypto';

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

    private _users: UserDataEntity[] = [];
    async createUser(userData: UserDataEntity): Promise<UserDataEntity> {
        // generate id
        userData.id = crypto.randomUUID();
        this._users.push(userData);
        return userData;
    }

    async getById(id: string): Promise<UserDataEntity | null> {
        switch (id) {
            case 'someofmyid':
                return new UserDataEntity({
                    id: 'someofmyid',
                    username: 'rei_ayanami@example.com',
                    passwordHashed: await PasswordUtils.hash('password'),
                    registerDate: new Date(),
                });
            default:
                return null;
        }
    }
}
