// jest
import { describe, test, expect } from "@jest/globals";
// internals
import { AppConfig } from "../../shared/app.config";
import { JwtService } from "../../auth/jwt.service";
import { CurrentUser } from "../dtos/current-user";

describe("JwtService tests", () => {
  test("createJwt() -> OK", () => {
    // Arrange
    let jwtService = new JwtService(
        new AppConfig()
    );
    const currentUser: CurrentUser = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        username: "testuser",
    };

    // Act
    const jwtToken: string = jwtService.createJwt(currentUser);
    
    // Assert
    expect(jwtToken).not.toBeNull();
  });

  test("decodeJwt() -> OK", () => {
    // Arrange
    let jwtService = new JwtService(
        new AppConfig()
    );
    const currentUser: CurrentUser = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        username: "testuser",
    };

    // Act
    const jwtToken: string = jwtService.createJwt(currentUser);

    // Act2
    const currentUser2: CurrentUser = jwtService.decodeJwt(jwtToken);
    
    // Assert
    expect(currentUser2.id).toBe(currentUser.id);
    expect(currentUser2.username).toBe(currentUser.username);
  });
});
