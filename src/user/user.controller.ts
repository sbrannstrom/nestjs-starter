import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  Put,
  Request,
} from '@nestjs/common';
import { IUser, UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async signupUser(@Body() payload: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userService.findOne({
      email: payload.email,
    });
    if (existingUser) {
      throw new BadRequestException();
    }
    if (payload.role !== Role.USER) {
      throw new UnauthorizedException();
    }
    return await this.userService.createUser(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Request() req, @Body() body: UpdateUserDto): Promise<IUser> {
    const user = await this.userService.findOne({
      id: Number(body.id),
    });
    if (!user) {
      throw new NotFoundException();
    }
    if (user.id !== req.user.id && req.user.role !== Role.ADMIN && req.user.role !== Role.SUPERUSER) {
      throw new UnauthorizedException();
    }
    return await this.userService.updateUser({
      where: {
        id: Number(body.id)
      },
      data: body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string, @Request() req): Promise<IUser> {
    const user = await this.userService.findOne({
      id: Number(id),
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }


}
