// jest
import { describe, test, expect } from "@jest/globals";
// internals
import { AuthenticationService } from "../authentication.service";

describe("AuthenticationService tests", () => {
  test("__hashPassword(), __verifyPassword() -> OK", async () => {
    // Arrange
    const password = "Heslo123";

    // Act
    const hashedPasswordWithSalt: string = await AuthenticationService.__hashAndSaltPassword(password);
    const isValid: boolean = await AuthenticationService.__verifyPassword(password, hashedPasswordWithSalt);

    // Assert
    expect(isValid).toBeTruthy()
  });

  test("__hashPassword(), __verifyPassword('WRONG_PASSWORD') -> FAIL", async () => {
    // Arrange
    const password = "password";

    // Act
    const hashedPasswordWithSalt: string = await AuthenticationService.__hashAndSaltPassword(password);
    const isValid: boolean = await AuthenticationService.__verifyPassword('WRONG_PASSWORD', hashedPasswordWithSalt);

    // Assert
    expect(isValid).toBeFalsy()
  });
});
