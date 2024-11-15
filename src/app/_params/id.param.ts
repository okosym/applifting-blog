import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class IdParam {
    @ApiProperty()
    @IsUUID()
    id: string;
} 