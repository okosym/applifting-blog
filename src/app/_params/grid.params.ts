import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class GridParams {
  @ApiProperty()
  @IsNumber()
  offset: number = 0;

  @ApiProperty()
  @IsNumber() @IsOptional()
  limit?: number;
} 