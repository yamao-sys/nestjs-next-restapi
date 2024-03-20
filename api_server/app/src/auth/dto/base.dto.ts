import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class BaseDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'メールアドレスは必須です。' })
  @IsEmail({}, { message: 'メールアドレスの形式が不正です。' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @MinLength(8, { message: 'パスワードは8文字以上で入力をお願いします。' })
  @MaxLength(20, { message: 'パスワードは20文字以上で入力をお願いします。' })
  password: string;
}
