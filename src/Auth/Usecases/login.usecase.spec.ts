import LoginUsecase from './login.usecase';
import {AuthRepositoryDummy} from '../Repositories/auth.repository.dummy';
import {GeneralError, NotFoundError, ValidationError} from '../../commons/Errors';

describe('Login Usecase', () => {
    it('should generate session token when provided with correct login', async () => {
        const loginUseCase = new LoginUsecase(new AuthRepositoryDummy());
        const loginResponse = await loginUseCase.loginWithUsernameAndPassword('rei_ayanami@example.com', 'password');
        expect(loginResponse).toHaveProperty('sessionToken');
        expect(loginResponse).toHaveProperty('refreshToken');
        expect(loginResponse).toHaveProperty('expiredAt');
    });
    it('should return user not found if user is not found', async () => {
        expect.assertions(1);
        try {
            const loginUseCase = new LoginUsecase(new AuthRepositoryDummy());
            await loginUseCase.loginWithUsernameAndPassword('not_existentuser@example.com', 'password');
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundError);
        }
    });
    it('should return password not match if password is wrong', async () => {
        expect.assertions(1);
        try {
            const loginUseCase = new LoginUsecase(new AuthRepositoryDummy());
            await loginUseCase.loginWithUsernameAndPassword('rei_ayanami@example.com', 'wrongpassword');
        } catch (err) {
            expect(err).toBeInstanceOf(GeneralError);
        }
    });
    it('should return validation error if username is empty', async () => {
        expect.assertions(1);
        try {
            const loginUseCase = new LoginUsecase(new AuthRepositoryDummy());
            await loginUseCase.loginWithUsernameAndPassword('', 'password');
        } catch (err) {
            expect(err).toBeInstanceOf(ValidationError);
        }
    });
    it('should return validation error if password is empty', async () => {
        expect.assertions(1);
        try {
            const loginUseCase = new LoginUsecase(new AuthRepositoryDummy());
            await loginUseCase.loginWithUsernameAndPassword('rei_ayanami@example.com', '');
        } catch (err) {
            expect(err).toBeInstanceOf(ValidationError);
        }
    });
});
