import RegisterUsecase from './register.usecase';
import {AuthRepositoryDummy} from '../Repositories/auth.repository.dummy';
import {RegisterResult} from '../Entity/RegisterData.entity';
import {ValidationError} from '../../../commons/Errors';

describe('Register usecase testing', () => {
    it('should success when using proper request', async () => {
        const registerUseCase = new RegisterUsecase(new AuthRepositoryDummy());
        const result = await registerUseCase.registerUser('miyuki@shiba.magic', 'onisama<3', {test: true});
        expect(result).toBeInstanceOf(RegisterResult);
        expect(result.uid).toBeTruthy();
        expect(result.username).toStrictEqual('miyuki@shiba.magic');
        expect(result.extraData).toStrictEqual({test: true});
    });
    it('should response user already exists when username is exists', async () => {
        expect.assertions(1);
        try {
            const registerUseCase = new RegisterUsecase(new AuthRepositoryDummy());
            await registerUseCase.registerUser('rei_ayanami@example.com', 'onisama<3', {test: true});
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
        }
    });
});
