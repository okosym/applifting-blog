// nest
import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
// internals
import { AuthModule } from "./auth/auth.module";
import { GlobalExceptionFilter } from "./_pipeline/global-exception.filter";
import { AuthenticationMiddleware } from './_pipeline/authentication.middleware';
import { ResultInterceptor } from "./_pipeline/result.interceptor";
import { ArticlesModule } from "./articles/articles.module";
import { SharedModule } from "./shared/shared.module";
import { ValidationPipeFactories } from "./_pipeline/validation-pipe.factories";
import { CommentsModule } from "./comments/comments.module";

@Module({
  imports: [AuthModule, ArticlesModule, CommentsModule, SharedModule],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ exceptionFactory: ValidationPipeFactories.customExceptionFactory }),
    },
    { provide: APP_INTERCEPTOR, useClass: ResultInterceptor },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { consumer.apply(AuthenticationMiddleware).forRoutes('*'); }
}
