// nest
import { Injectable } from "@nestjs/common";
// internals
import { CurrentUser } from "../auth/dtos/current-user";

@Injectable()
export class AppContext {
    
    // Properties
    currentUser?: CurrentUser;

    ipAddress: string;
}