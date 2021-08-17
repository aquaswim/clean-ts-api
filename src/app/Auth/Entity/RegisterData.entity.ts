export interface IRegisterResult {
    uid: string;
    username: string;
    extraData: unknown;
}

export class RegisterResult implements IRegisterResult {
    get extraData(): unknown {
        return this._extraData;
    }
    get username(): string {
        return this._username;
    }

    get uid(): string {
        return this._uid;
    }

    constructor(data: IRegisterResult) {
        this._uid = data.uid;
        this._username = data.username;
        this._extraData = data.extraData;
    }

    private readonly _uid: string;
    private readonly _username: string;
    private readonly _extraData: unknown;
}
