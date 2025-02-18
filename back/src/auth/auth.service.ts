import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { RedisService } from 'redis/redis.service';
import { CommonService } from 'common/common.service';
import { MailService } from 'mail/mail.service';
import { Request } from 'express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private redisService: RedisService,
    private commonService: CommonService,
    private mailService: MailService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; token: string }> {
    const { name, email, password } = signUpDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const randomCode = this.commonService.generateRandomString(8);

    await this.redisService.setValidationUserEmail(
      email,
      randomCode.toString(),
    );

    await this.mailService.sendMail(email, 'verification-code', {
      code: randomCode,
    });

    const token = this.jwtService.sign({ id: user.id });

    return { message: 'Verify your email to complete registration', token };
  }

  async login(loginDto: LoginDto): Promise<{ message: string; token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { message: 'Login successful', token };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto, @Req() req: Request) {
    const { code } = verifyEmailDto;
    const { email } = req.user;

    const validCode = await this.redisService.getValidationUserEmail(email);

    if (validCode !== code) {
      throw new BadRequestException('Your code is invalid or expired');
    }

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    user.emailValidated = true;

    await this.usersRepository.save(user);

    return { message: 'Email verified successfully', user };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return;
    }

    const randomCode = this.commonService.generateRandomString(8);

    await this.redisService.setForgotPassword(email, randomCode.toString());

    await this.mailService.sendMail(email, 'reset-password', {
      code: randomCode,
    });

    return { message: 'Check your email for the reset code' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, code, password } = resetPasswordDto;

    const validCode = await this.redisService.getForgotPassword(email);

    if (validCode !== code) {
      throw new BadRequestException('Your code is invalid or expired');
    }

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await this.usersRepository.save(user);

    return { message: 'Password reset successfully' };
  }

  async getSignUpVerificationCode(req: Request) {
    const { email } = req.user;

    const randomCode = this.commonService.generateRandomString(8);

    await this.redisService.setValidationUserEmail(
      email,
      randomCode.toString(),
    );

    await this.mailService.sendMail(email, 'verification-code', {
      code: randomCode,
    });

    return { message: 'Check your email for the verification code' };
  }
}
