// internals
import { ErrorType } from "../shared/errors/error-type";

export type Result<T> = {
    success: true,
    data: T,
} | {
    success: false,
    errorType: ErrorType,
    errorMessages: string[],
}
