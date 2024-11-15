// nest
import { Injectable } from '@nestjs/common';
// internals
import { UserModel } from './dtos/user.model';

@Injectable()
export class UsersRepo {

  // Methods
  async findByUsername(username: string): Promise<UserModel | undefined> {
    return UserModel.query().findOne({ username });
  }
  
}