import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import User from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(
    @Req() req: Request,
  ): Promise<{ name: string; email: string; emailValidated: boolean }> {
    const user = await this.usersService.getCurrentUser(req);
    return {
      name: user.name,
      email: user.email,
      emailValidated: user.emailValidated,
    };
  }

  // @Get()
  // @UseGuards(AuthGuard('jwt'))
  // async getAllUsers(): Promise<User[]> {
  //   const users = await this.usersService.getAllUsers();
  //   return users;
  // }

  // @Get(':id')
  // async getUserById(@Param('id') id: string): Promise<User> {
  //   const user = await this.usersService.getUserById(Number(id));
  //   return user;
  // }

  // @Delete(':id')
  // async deleteById(@Param('id') id: string): Promise<User> {
  //   const user = this.usersService.deleteById(Number(id));
  //   return user;
  // }
}
