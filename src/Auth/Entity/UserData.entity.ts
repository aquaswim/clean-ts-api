export interface IUserDataEntity {
    id: string;
    username: string;
    passwordHashed: string;
    registerDate: Date;
}

export class UserDataEntity implements IUserDataEntity {
    get username(): string {
        return this._username;
    }

    get registerDate(): Date {
        return this._registerDate;
    }

    get passwordHashed(): string {
        return this._passwordHashed;
    }

    get id(): string {
        return this._id;
    }

    constructor(data: Partial<IUserDataEntity>) {
        this._id = data.id || '';
        this._username = data.username || '';
        this._passwordHashed = data.passwordHashed || '';
        this._registerDate = data.registerDate || new Date();
    }

    private readonly _id: string;
    private readonly _passwordHashed: string;
    private readonly _registerDate: Date;
    private readonly _username: string;
}
