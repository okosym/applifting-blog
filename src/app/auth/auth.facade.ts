// nest
import { Injectable } from "@nestjs/common";
// internals
import { AuthenticationService } from "./authentication.service";
import { JwtService } from "./jwt.service";
import { UserModel } from "./dtos/user.model";

@Injectable()
export class AuthFacade {
  // Constructor
  constructor(private readonly _authenticationService: AuthenticationService,
    private readonly _jwtService: JwtService
  ) {}

  // Methods
  async login(username: string, password: string): Promise<string> {
    // get user by credentials
    const user: UserModel = await this._authenticationService.login(username, password);

    // create jwtToken from user
    const jwtToken: string = this._jwtService.createJwt({
      id: user.id,
      username: user.username,
    });

    // return jwtToken
    return jwtToken;
  }
}
