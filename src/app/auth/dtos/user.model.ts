// nest
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
// externals
import { Model } from "objection";

export class UserModel extends Model {
  static tableName = 'user';

  // Properties
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(200)
  name!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(200)
  username!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(200)
  password!: string;

  @ApiProperty()
  @IsDate()
  createDate!: string;
}
