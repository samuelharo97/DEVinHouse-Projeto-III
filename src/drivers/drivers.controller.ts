import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { DriversService } from './drivers.service';
import { BlockDriverDTO } from './dto/block-driver.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  public async create(@Body() body: CreateDriverDto) {
    const driver = await this.driversService.create(body);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/drivers/${body.cpf}`,
      })
      .withBody({ driver })
      .build();
  }

  @Get()
  public async findAll(
    @Query('page') page = 0,
    @Query('size') size = 0,
    @Query('name') name: string,
  ): Promise<NestResponse> {
    const response = this.driversService.findAll(page, size, name);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers`,
      })
      .withBody(response)
      .build();
  }

  @Get(':cpf')
  public async findOne(@Param('cpf') cpf: string): Promise<NestResponse> {
    const driver = await this.driversService.findOne(cpf);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/${driver.cpf}`,
      })
      .withBody(driver)
      .build();
  }

  @Put(':cpf')
  public async update(
    @Param('cpf') cpf: string,
    @Body() body: UpdateDriverDto,
  ): Promise<NestResponse> {
    const driver = await this.driversService.update(cpf, body);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/${driver.cpf}`,
      })
      .withBody(driver)
      .build();
  }

  @Delete(':cpf')
  public async remove(@Param('cpf') cpf: string): Promise<NestResponse> {
    await this.driversService.remove(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/block/${cpf}`,
      })
      .withBody({ message: `driver deleted` })
      .build();
  }

  @Patch('/block/:cpf')
  public async block(@Param('cpf') cpf: string, @Body() body: BlockDriverDTO) {
    console.log(body);
    if (body.blocked == undefined) {
      throw new BadRequestException();
    }

    const driver = await this.driversService.block(cpf, body);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/block/${cpf}`,
      })
      .withBody(driver)
      .build();
  }
}
