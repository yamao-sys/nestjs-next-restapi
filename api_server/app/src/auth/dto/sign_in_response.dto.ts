import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    example: ['メールアドレス、またはパスワードが異なります。'],
  })
  errors: string[];
}
