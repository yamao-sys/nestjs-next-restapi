import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { SignUpDto } from './dto/sign_up.dto';
import { SignInDto } from './dto/sign_in.dto';
import { User } from 'src/users/entities/user.entity';
import { validate } from 'class-validator';
import { format_validation_errors } from 'src/lib/format_validation_errors';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  SIGN_IN_VALIDATION_ERRORS = [
    'メールアドレス、またはパスワードが異なります。',
  ];

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const user = new User();
    user.email = email;
    user.password = password;

    // バリデーションチェック
    const validationErrors = await validate(user);
    if (!!validationErrors.length) {
      return { email, errors: format_validation_errors(validationErrors) };
    }

    // ハッシュ化したパスワードを格納
    user.password = await bcrypt.hash(password, 10);

    await this.userService.save(user);
    return { email: user.email };
  }

  async validateSignIn(signinDto: SignInDto) {
    const { email, password } = signinDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return { user: null, errors: this.SIGN_IN_VALIDATION_ERRORS };
    }

    const comparedResult = await bcrypt.compare(password, user.password);
    if (!comparedResult) {
      return { user: null, errors: this.SIGN_IN_VALIDATION_ERRORS };
    }
    const errors: string[] = [];
    return { user, errors };
  }

  async signIn(user: User) {
    const payload: JwtPayload = { userId: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
