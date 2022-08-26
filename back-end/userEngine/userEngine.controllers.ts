import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public, User } from 'src/decorators';
import { IUser } from 'interfaces/users.interface';
import { AuthService } from './userEngine.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@User() user: IUser) {
    return this.authService.login(user);
  }

  
}