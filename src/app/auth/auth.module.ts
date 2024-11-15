// nest
import { Module } from "@nestjs/common";
// internals
import { SharedModule } from "../shared/shared.module";
import { AuthController } from "./auth.controller";
import { AuthFacade } from "./auth.facade";
import { AuthenticationService } from "./authentication.service";
import { UsersRepo } from "./users.repo";
import { JwtService } from "./jwt.service";
import { AuthGuards } from "./auth.guards";

@Module({
  controllers: [AuthController],
  imports: [SharedModule],
  providers: [AuthFacade,
    AuthenticationService, UsersRepo, JwtService,
    AuthGuards],
  exports: [AuthGuards, JwtService]
})
export class AuthModule {}
