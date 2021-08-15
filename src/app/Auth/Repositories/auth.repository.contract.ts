import {UserDataEntity} from '../Entity/UserData.entity';

export interface IAuthRepositoryContract {
    getUserByUsername(username: string): Promise<UserDataEntity | null>;
}
