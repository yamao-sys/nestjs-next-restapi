import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign_up.dto';
import { SignInDto } from './dto/sign_in.dto';
import { SignUpResponseDto } from './dto/sign_up_response.dto';
import { SignInResponseDto } from './dto/sign_in_response.dto';
// import { SignInDto, SignUpDto, SignUpResponseDto } from 'api/auth/@types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // @ApiResponseデコレータは型側に@ApiProperty()の付与が必要で自動生成したファイルそのまま使用できず
  // → アクションの戻り値で自動生成された型を指定
  // 参考: https://docs.nestjs.com/openapi/operations
  @ApiCreatedResponse({ type: SignUpResponseDto, description: 'sign up完了' })
  @Post('sign_up')
  async signUp(@Body() signupDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: SignInResponseDto, description: 'sign in完了' })
  @Post('sign_in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { user, errors } = await this.authService.validateSignIn(signInDto);
    if (!!errors.length) {
      return response.send({ errors });
    }

    const token = await this.authService.signIn(user);
    response.cookie('token', token).send({ errors });
  }
}
