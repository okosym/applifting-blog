// nest, node
import { Injectable } from "@nestjs/common";
import { promisify } from 'util';
// externals
import * as crypto from 'crypto';
// internals
import { AppError } from "../shared/errors/app-error";
import { UserModel } from "./dtos/user.model";
import { UsersRepo } from "./users.repo";

const pbkdf2 = promisify(crypto.pbkdf2);

@Injectable()
export class AuthenticationService {
  // Constructor
  constructor(private readonly _usersRepo: UsersRepo) {}

  // Methods
  async login(username: string, password: string): Promise<UserModel> {
    // get user by username
    const user: UserModel = await this._usersRepo.findByUsername(username);
    if (!user)
      throw AppError.AuthError("Wrong username or password.")
    
    // verify password
    const isValid = await AuthenticationService.__verifyPassword(password, user.password);
    if (!isValid) 
      throw AppError.AuthError("Wrong username or password.");

    // return user
    return user;
  }

  /**
   * Hashes a password with a salt. Returns the hashed password in format: 'hashedPassword.salt'.
   */
  static async __hashAndSaltPassword(password: string, salt?: string): Promise<string> {
    if (!salt) {
      salt = crypto.randomBytes(16).toString('hex');
    }
    const hashedPassword = (await pbkdf2(password, salt, 10000, 64, 'sha512')).toString('hex');
    const hashedPasswordWithSalt = `${hashedPassword}.${salt}`;
    return hashedPasswordWithSalt;
  }

  /**
   * Verifies a password against a hashedPasswordWithWalt from DB.
   */
  static async __verifyPassword(password: string, hashedPasswordWithSalt: string): Promise<boolean> {
    const [hashedPassword, salt] = hashedPasswordWithSalt.split('.');
    const newHashedPasswordWithSalt = await this.__hashAndSaltPassword(password, salt);
    const isValid = (newHashedPasswordWithSalt === hashedPasswordWithSalt);
    return isValid;
  }
}
