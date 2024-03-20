import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'メールアドレスは必須です。' })
  email: string;

  @IsNotEmpty({ message: 'パスワードは必須です。' })
  password: string;
}
