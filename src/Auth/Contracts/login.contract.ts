import {AuthSessionEntitiy} from '../Entity/AuthSession.entitiy';

export interface ILoginContract {
    loginWithUsernameAndPassword(username: string, password: string): Promise<AuthSessionEntitiy>;
}
