import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { ResetPasswordDto } from './dto/user.dto';
import { MailService } from '../mail/mail.service';
import { CommonService } from 'common/common.service';
import { RedisService } from 'redis/redis.service';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly commonService: CommonService,
    private readonly redisService: RedisService,
  ) {}

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }

  async forgotPassword(resetPasswordDto: ResetPasswordDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: resetPasswordDto.email },
    });

    if (!existingUser) {
      throw new BadRequestException('User with this email does not exist');
    }

    const randomCode = this.commonService.generateRandomNumber(6);

    await this.redisService.setValidationUserEmail(
      resetPasswordDto.email,
      randomCode.toString(),
    );

    await this.mailService.sendMail(resetPasswordDto.email, 'reset-password', {
      code: randomCode,
    });

    return existingUser;
  }
}
