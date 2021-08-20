import {IRegisterContract} from '../Contracts/register.contract';
import {RegisterResult} from '../Entity/RegisterData.entity';
import {IAuthRepositoryContract} from '../Contracts/auth.repository.contract';
import {ValidationError} from '../../../commons/Errors';
import {PasswordUtils} from '../../../commons/password.utils';
import {UserDataEntity} from '../Entity/UserData.entity';
import {autoInjectable, inject} from 'tsyringe';

@autoInjectable()
export default class RegisterUsecase implements IRegisterContract {
    constructor(@inject('AuthRepository') private authRepository?: IAuthRepositoryContract) {}
    async registerUser(username: string, password: string, extraData: unknown): Promise<RegisterResult> {
        // check username existance
        if ((await this.authRepository!.getUserByUsername(username)) !== null) {
            throw new ValidationError('Username already exists');
        }
        RegisterUsecase.validateExtraData(extraData);
        // hash password
        const passwordHashed = await PasswordUtils.hash(password);
        // insert to db
        const userEntity = await this.authRepository!.createUser(
            new UserDataEntity({
                username,
                passwordHashed,
                extraData,
            })
        );
        return new RegisterResult({
            uid: userEntity.id,
            username: userEntity.username,
            extraData: userEntity.extraData as never,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private static validateExtraData(extraData: unknown): void {
        // nothing for now
        return;
    }
}
