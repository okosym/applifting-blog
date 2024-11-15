// internals
import { ErrorType } from "./error-type";

export class AppError extends Error {
    // Properties
    type: ErrorType;
    messages: string[] = [];
    
    // Constructor
    private constructor(type: ErrorType, msg: string | string[]) {
        super();
        this.type = type;
        this.messages = (msg instanceof Array) ? msg : [msg];
    }

    // Factory methods
    static ValidationError(msg: string | string[]): AppError {
        return new AppError(ErrorType.ValidationError, msg);
    }

    static AuthError(msg: string | string[]): AppError {
        return new AppError(ErrorType.AuthError, msg);
    }

    static ApplicationError(msg: string | string[]): AppError {
        return new AppError(ErrorType.ApplicationError, msg);
    }
}
