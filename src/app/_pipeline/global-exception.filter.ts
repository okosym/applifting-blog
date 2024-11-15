// nest
import { ArgumentsHost, Catch, HttpException, HttpStatus, Injectable, Response } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
// internals
import { AppError } from "../shared/errors/app-error";
import { ErrorType } from "../shared/errors/error-type";
import { Result } from "./result";

/**
 * Wraps ERROR to Result.
 */
@Catch()
@Injectable()
export class GlobalExceptionFilter extends BaseExceptionFilter {

  catch(ex: unknown, host: ArgumentsHost) {
    // debug
    //console.log('GlobalExceptionFilter');

    // HttpException
    if (ex instanceof HttpException) {
      super.catch(ex, host);
    }
    else if (ex instanceof AppError || ex instanceof Error) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();

      // AppError
      if (ex instanceof AppError) {
        const result: Result<never> = {
          success: false,
          errorType: ex.type,
          errorMessages: ex.messages,
        };
        response.status(HttpStatus.OK).json(result);
      }
      // Error
      else if (ex instanceof Error) {
        const result: Result<never> = {
          success: false,
          errorType: ErrorType.Exception,
          errorMessages: [ex.message],
          //errorMessages: [ex.stack],
        };
        response.status(HttpStatus.OK).json(result);
      }
    }
  }
}
