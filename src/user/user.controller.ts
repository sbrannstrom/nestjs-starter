import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  // Put,
  // Delete,
} from '@nestjs/common';
import { IUser, UserService } from './user.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body() payload: { name?: string; email: string; password: string },
  ): Promise<IUser> {
    const existingUser = await this.userService.findOne({
      email: payload.email,
    });
    if (existingUser) {
      throw new HttpErrorByCode[400]();
    }
    return await this.userService.createUser(payload);
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string): Promise<IUser> {
    const user = await this.userService.findOne({
      id: Number(id),
    });
    if (!user) {
      throw new HttpErrorByCode[404]();
    }
    return user;
  }
}
