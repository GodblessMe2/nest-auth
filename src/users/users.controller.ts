import { Body, Post, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.usersService.createUser(
      username,
      email,
      hashedPassword,
    );
    return result;
  }
}
