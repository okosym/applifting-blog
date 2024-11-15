// nest
import { ValidationError } from "class-validator";
// internals
import { AppError } from "../shared/errors/app-error";

export class ValidationPipeFactories {
  /**
   * Parses ValidationError[] to string[] and returns AppError.ValidationError (instead of BadRequestExceptin).
   */
  static customExceptionFactory(errors: ValidationError[]) {
    const errorMessages = ValidationPipeFactories._getErrorMessages(errors);
    return AppError.ValidationError(errorMessages);
  };

  private static _getErrorMessages(errors: ValidationError[], parentPath: string = ''): string[] {
    let messages: string[] = [];
    for (const error of errors) {
        const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;
        if (error.constraints) {
            messages = messages.concat(
                Object.values(error.constraints).map(
                    (msg) => `${propertyPath}: ${msg}`
                )
            );
        }
        if (error.children && error.children.length > 0) {
            messages = messages.concat(this._getErrorMessages(error.children, propertyPath));
        }
    }
    return messages;
  }

}