// nest
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppConfig {
    // Properties
    jwt: {
        secret: string;
        expiresInHours: number;
    }

    // Constructor
    constructor() {
        this.jwt = { 
            secret: "v1th6RdDxbeUGsTmhwi8Z1l1eUXEBnk7",
            expiresInHours: 1
         }
    }
}