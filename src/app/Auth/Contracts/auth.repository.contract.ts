import {UserDataEntity} from '../Entity/UserData.entity';

export interface IAuthRepositoryContract {
    getUserByUsername(username: string): Promise<UserDataEntity | null>;
    getById(id: string): Promise<UserDataEntity | null>;
    createUser(userData: UserDataEntity): Promise<UserDataEntity>;
}
