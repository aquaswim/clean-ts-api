export interface IUserDataEntity<T = {} | unknown> {
    id: string;
    username: string;
    passwordHashed: string;
    registerDate: Date;
    extraData: T;
}

export class UserDataEntity<T = {} | unknown> implements IUserDataEntity {
    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    get extraData(): unknown {
        return this._extraData;
    }

    set extraData(value: unknown) {
        this._extraData = value;
    }

    get username(): string {
        return this._username;
    }

    get registerDate(): Date {
        return this._registerDate;
    }

    get passwordHashed(): string {
        return this._passwordHashed;
    }

    constructor(data: Partial<IUserDataEntity>) {
        this._id = data.id || '';
        this._username = data.username || '';
        this._passwordHashed = data.passwordHashed || '';
        this._registerDate = data.registerDate || new Date();
        this._extraData = data.extraData || {};
    }

    private _extraData: unknown;
    private _id: string;
    private readonly _passwordHashed: string;
    private readonly _registerDate: Date;
    private readonly _username: string;
}
