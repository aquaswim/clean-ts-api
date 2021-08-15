import {RegisterResult} from '../Entity/RegisterData.entity';

export interface IRegisterContract {
    registerUser(username: string, password: string, extraData: never): Promise<RegisterResult>;
}
