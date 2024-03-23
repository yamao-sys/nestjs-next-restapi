import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    example: ['メールアドレスは必須です。', 'パスワードは必須です。'],
  })
  errors: Array<string>;
}
