// nest, rxjs
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

/**
 * Wraps OK response to Result.
 */
@Injectable()
export class ResultInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((res) => {
                // debug
                //console.log('ResultInterceptor');

                const response = context.switchToHttp().getResponse();
                const { statusCode } = response;

                const successStatusCodes = [HttpStatus.OK, HttpStatus.CREATED, HttpStatus.ACCEPTED];
                if (successStatusCodes.includes(statusCode)) {
                    response.status(HttpStatus.OK).json({
                        success: true,
                        data: res
                    });
                }
            })
        );
    }
}