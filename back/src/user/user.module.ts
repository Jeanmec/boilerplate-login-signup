import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import User from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'mail/mail.module';
import { CommonModule } from 'common/common.module';
import { RedisModule } from 'redis/redis.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    CommonModule,
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
