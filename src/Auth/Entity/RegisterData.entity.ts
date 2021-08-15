export interface IRegisterResult {
    uid: string;
    username: string;
}

export class RegisterResult implements IRegisterResult {
    get username(): string {
        return this._username;
    }

    get uid(): string {
        return this._uid;
    }

    constructor(data: IRegisterResult) {
        this._uid = data.uid;
        this._username = data.username;
    }

    private readonly _uid: string;
    private readonly _username: string;
}
