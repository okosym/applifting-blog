// nest
import { Module, Scope } from "@nestjs/common";
// internals
import { AppConfig } from "./app.config";
import { AppContext } from "./app.context";

@Module({
    providers: [ 
      AppConfig,
      { provide: AppContext, useClass: AppContext, scope: Scope.REQUEST }
    ],
    exports: [AppConfig, AppContext],
})
export class SharedModule {}