import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { SignInDto, SignUpDto } from 'api/auth/@types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // return this.userService.create({ email, password: hashedPassword });
    const user = await this.userService.create({
      email,
      password: hashedPassword,
    });
    return { id: user.id, email: user.email };
  }

  async signIn(signinDto: SignInDto) {
    const { email, password } = signinDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { userId: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
