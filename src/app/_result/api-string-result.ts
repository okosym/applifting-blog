import { ApiProperty } from "@nestjs/swagger";

export class ApiStringResult {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty()
  data: string;
} 