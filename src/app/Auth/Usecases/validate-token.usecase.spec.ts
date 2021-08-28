import ValidateToken from './validate-token.usecase';
import {JwtUtils} from '../../../commons/jwt.utils';
import {ITokenPayload, TokenPayload} from '../Entity/TokenPayload.entity';
import {CredentialError} from '../../../commons/Errors';

describe('Validate token usecase', () => {
    it('should decode payload when valid', async () => {
        const validateTokenUseCase = new ValidateToken();
        const generateDate = Date.now();
        const token = await JwtUtils.signSessionToken<ITokenPayload>('1', {
            generateDate,
            uid: '1',
            username: 'a@a.com',
        });
        const result = await validateTokenUseCase.decode(token);
        expect(result).toBeInstanceOf(TokenPayload);
        expect(result.uid).toStrictEqual('1');
        expect(result.username).toStrictEqual('a@a.com');
        expect(result.generateDate).toStrictEqual(generateDate);
    });
    it('should throw invalid token when the provided with invalid token', async () => {
        expect.hasAssertions();
        try {
            const validateTokenUseCase = new ValidateToken();
            const token = 'invalid-token';
            await validateTokenUseCase.decode(token);
        } catch (err) {
            expect(err).toBeInstanceOf(CredentialError);
        }
    });
    it('should throw expired token when provided with expired token', async () => {
        expect.hasAssertions();
        try {
            const validateTokenUseCase = new ValidateToken();
            const generateDate = Date.now();
            const token = await JwtUtils.signSessionToken<ITokenPayload & {exp: number}>('1', {
                generateDate,
                uid: '1',
                username: 'a@a.com',
                exp: 10,
            });
            await validateTokenUseCase.decode(token);
        } catch (err) {
            expect(err).toBeInstanceOf(CredentialError);
            expect(err.message).toMatch(/expired/);
        }
    });
});
