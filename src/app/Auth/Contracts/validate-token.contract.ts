import {TokenPayload} from '../Entity/TokenPayload.entity';

export interface IValidateTokenContract {
    decode(token: string): Promise<TokenPayload>;
}
