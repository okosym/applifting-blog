import { ApiProperty } from "@nestjs/swagger";

export class ApiErrorResult {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      errorType: { type: 'string', enum: ['ValidationError', 'AuthError', 'ApplicationError', 'Exception'] },
      errorMessages: { type: 'array', items: { type: 'string' } },
    },
  })
  error: {
    errorType: string;
    errorMessages: string[];
  };
}