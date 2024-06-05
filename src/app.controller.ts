import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { create } from 'domain';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('auth/register')
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.register(CreateUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
