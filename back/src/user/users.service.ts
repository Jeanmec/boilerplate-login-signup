import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { MailService } from 'mail/mail.service';
import { CommonService } from 'common/common.service';
import { RedisService } from 'redis/redis.service';
import { Request } from 'express';

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

  async getCurrentUser(req: Request): Promise<User> {
    return req.user;
  }
}
