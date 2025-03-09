import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { EmailVericationDto } from './dto/email-verification.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'User sign-up' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/password/forgot')
  @ApiOperation({ summary: 'Forgot password' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/password/reset')
  @ApiOperation({ summary: 'Reset password' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/email/verify')
  emailVerification(
    @Body() emailVerificationDto: EmailVericationDto,
    @Req() req: Request,
  ) {
    return this.authService.emailVerification(emailVerificationDto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/email/verification-code')
  getSignUpVerificationCode(@Req() req: Request) {
    return this.authService.getSignUpVerificationCode(req);
  }
}
