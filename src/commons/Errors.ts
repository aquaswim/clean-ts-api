export enum ErrorType {
    GENERAL,
    NOTFOUND,
    INVALID_CREDENTIAL,
    VALIDATION_ERROR,
    DB,
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

export class ValidationError extends BaseError {
    constructor(message: string) {
        super(message, ErrorType.VALIDATION_ERROR);
    }
}

export class DBError extends BaseError {
    constructor(driver: string, message: string) {
        super(`DB::${driver}::${message}`, ErrorType.DB);
    }
}
