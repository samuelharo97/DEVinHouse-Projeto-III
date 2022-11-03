import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  Query,
  Put,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  public async findAll(
    @Query('page') page = 0,
    @Query('limit') limit = 0,
    @Query('name') name: string,
  ): Promise<NestResponse> {
    const users = this.usersService.findAll(page, limit, name);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/users`,
      })
      .withBody(users)
      .build();
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
