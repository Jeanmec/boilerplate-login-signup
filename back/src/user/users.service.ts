import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/user.dto';
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

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const randomCode = this.commonService.generateRandomNumber(6);

    await this.redisService.set(
      createUserDto.email,
      randomCode.toString(),
      60 * 15,
    );

    await this.mailService.sendMail(createUserDto.email, 'verification-code', {
      code: randomCode,
    });

    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);

    return newUser;
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
}
