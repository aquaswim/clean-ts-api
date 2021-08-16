import {container} from 'tsyringe';
import {AuthRepository} from './app/Auth/Repositories/auth.repository';
import RegisterUsecase from './app/Auth/Usecases/register.usecase';
import LoginUsecase from './app/Auth/Usecases/login.usecase';

container.register('AuthRepository', {
    useClass: AuthRepository,
});

container.register('RegisterUsecase', {
    useClass: RegisterUsecase,
});

container.register('LoginUsecase', {
    useClass: LoginUsecase,
});
