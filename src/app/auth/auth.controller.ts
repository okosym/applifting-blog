// externals
import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
// internals
import { AuthFacade } from "./auth.facade";
import { LoginIN } from "./dtos/login.in";
import { ApiStringResult } from "../_result/api-string-result";
import { ApiErrorResult } from "../_result/api-error-result";

@Controller("auth")
export class AuthController {
  // Constructor
  constructor(private readonly _authFacade: AuthFacade) {}

  @Post("login")
  @ApiResponse({ status: 200, type: ApiStringResult, example: { success: true, data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..." }, description: "Success response: returns jwt token" })
  @ApiResponse({ status: "2XX", type: ApiErrorResult, description: "(také kód 200): Error response" })
  async login(@Body() inputDTO: LoginIN): Promise<string> {
    // call facade method
    const jwt: string = await this._authFacade.login(inputDTO.username, inputDTO.password);

    // return jwt
    return jwt;
  }
}
