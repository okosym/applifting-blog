// nest
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginIN {
    // Properties

    @ApiProperty()
    @IsString() @IsNotEmpty() @MaxLength(200)
    username: string;

    @ApiProperty()
    @IsString() @IsNotEmpty() @MaxLength(200)
    password: string;
}