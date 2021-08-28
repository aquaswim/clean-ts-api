import {IValidateTokenContract} from '../Contracts/validate-token.contract';
import {ITokenPayload, TokenPayload} from '../Entity/TokenPayload.entity';
import {JwtUtils} from '../../../commons/jwt.utils';

export default class ValidateToken implements IValidateTokenContract {
    async decode(token: string): Promise<TokenPayload> {
        const cekToken = await JwtUtils.decodeSessionToken<ITokenPayload>(token);
        // response with payload
        return new TokenPayload(cekToken);
    }
}
