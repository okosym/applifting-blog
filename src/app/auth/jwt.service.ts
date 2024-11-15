// nest
import { Injectable } from "@nestjs/common";
// externals
import * as jwt from 'jsonwebtoken';
// internals
import { AppConfig } from '../shared/app.config';
import { AppError } from "../shared/errors/app-error";
import { CurrentUser } from "./dtos/current-user";

@Injectable()
export class JwtService {
    // Constructor
    constructor(private readonly _appConfig: AppConfig) {}

    // Methods
    createJwt(currentUser: CurrentUser): string {
        const expiresInSeconds: number = this._appConfig.jwt.expiresInHours * 60 * 60;
        let jwtToken = jwt.sign(currentUser, this._appConfig.jwt.secret, { expiresIn: expiresInSeconds, algorithm: "HS256" });
        return jwtToken;
    }

    decodeJwt(jwtToken: string): CurrentUser {
        try {
            const currentUser = jwt.verify(jwtToken, this._appConfig.jwt.secret) as CurrentUser; // should be CurrentUserDTO as verified by signature
            return currentUser;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) 
                throw AppError.AuthError("JwtToken expired.");
            
            throw AppError.AuthError("Problem when decoding JwtToken.");
        }
    }
}