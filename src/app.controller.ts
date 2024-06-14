import { Controller, Request, Post, Body, UseGuards, UsePipes, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto, CreateUserSchema } from './users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { create } from 'domain';
import { ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from './pipes/ValidationPipe';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  hello() {
    return 'Hello world!'
  }

  @Post('auth/register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.register(CreateUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
