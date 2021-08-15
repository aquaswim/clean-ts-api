export interface IAuthSession {
    sessionToken: string | null;
    refreshToken: string | null;
    expiredAt: number;
}

export class AuthSessionEntitiy implements IAuthSession {
    get expiredAt(): number {
        return this._expiredAt;
    }
    get sessionToken(): string | null {
        return this._sessionToken;
    }
    get refreshToken(): string | null {
        return this._refreshToken;
    }
    constructor(data: Partial<IAuthSession>) {
        this._refreshToken = data.refreshToken || null;
        this._sessionToken = data.sessionToken || null;
        this._expiredAt = data.expiredAt || 0;
    }

    private readonly _refreshToken: string | null;
    private readonly _sessionToken: string | null;
    private readonly _expiredAt: number;
}
