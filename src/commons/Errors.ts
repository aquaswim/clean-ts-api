export enum ErrorType {
    GENERAL,
    NOTFOUND,
    INVALID_CREDENTIAL,
}

export class BaseError extends Error {
    private readonly _errorType: ErrorType;

    constructor(message: string, type: ErrorType) {
        super(message);
        this._errorType = type;
    }

    get errorType(): ErrorType {
        return this._errorType;
    }
}

export class GeneralError extends BaseError {
    constructor(message: string) {
        super(message, ErrorType.GENERAL);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, ErrorType.NOTFOUND);
    }
}

export class CredentialError extends BaseError {
    constructor(message: string) {
        super(message, ErrorType.INVALID_CREDENTIAL);
    }
}
