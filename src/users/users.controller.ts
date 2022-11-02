import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/users/${createdUser.cpf}`,
      })
      .withBody(createdUser)
      .build();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.usersService.findOne(cpf);
  }

  @Put(':cpf')
  update(@Param('cpf') cpf: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(cpf, updateUserDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.usersService.remove(cpf);
  }
}
