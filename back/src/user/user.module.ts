import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import User from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'mail/mail.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
