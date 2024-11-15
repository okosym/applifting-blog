// nest
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
// internals
import { AppConfig } from "../shared/app.config";
import { AppContext } from "../shared/app.context";
import { JwtService } from "../auth/jwt.service";
import { CurrentUser } from "../auth/dtos/current-user";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  // Constructor
  constructor(private readonly _appContext: AppContext,
    private readonly _jwtService: JwtService,
  ) {}

  // Methods
  use(req: Request, res: Response, next: NextFunction) {
    // debug
    //console.log('AuthenticationMiddleware');
    
    // get jwt token
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // decode jwt token to get currentUser
      const jwtToken = authHeader.slice(7, authHeader.length);
      let currentUser: CurrentUser = this._jwtService.decodeJwt(jwtToken);
      // set currentUser in contextService
      this._appContext.currentUser = currentUser;
    }

    // get ipAddress
    const ipAddress = req.ip;
    // set ipAddress in contextService
    this._appContext.ipAddress = ipAddress;
    next();
  }
}