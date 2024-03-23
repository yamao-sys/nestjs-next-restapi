import {
  Body,
  Controller,
  HttpCode,
  HttpException,
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
import { format_validation_errors } from 'src/lib/format_validation_errors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: SignUpResponseDto, description: 'sign up完了' })
  @Post('sign_up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.authService.buildNewUser(signUpDto);

    const validationErrors = await this.authService.validateSignUp(user);
    if (!!validationErrors.length) {
      return { errors: format_validation_errors(validationErrors) };
    }

    try {
      await this.authService.signUp(user);
      return { errors: [] };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
