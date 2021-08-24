export interface ITokenPayload {
    username: string;
    uid: string;
    generateDate: number;
}

export class TokenPayload implements ITokenPayload {
    get username(): string {
        return this._username;
    }
    get uid(): string {
        return this._uid;
    }
    get generateDate(): number {
        return this._generateDate;
    }
    private readonly _generateDate: number = 0;
    private readonly _uid: string = '';
    private readonly _username: string = '';
    constructor(data: Partial<ITokenPayload>) {
        if (data.generateDate) this._generateDate = data.generateDate;
        if (data.uid) this._uid = data.uid;
        if (data.username) this._username = data.username;
    }
}
