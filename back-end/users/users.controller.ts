import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from 'interfaces/users.interface';
import { Public, User } from 'src/decorators';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('')
  async register(@Body() data: IUser) {
    return this.usersService.register(data);
  }

  @Get('profile')
  getProfile(@User() user: IUser) {
    return this.usersService.profile(user);
  }
}