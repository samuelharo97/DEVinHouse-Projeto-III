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
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { DriversService } from './drivers.service';
import { BlockDriverDTo } from './dto/block-driver.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  public async create(@Body() driver: CreateDriverDto) {
    driver.blocked = driver.blocked || false;
    const createdDriver = await this.driversService.create(driver);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/drivers/${createdDriver.cpf}`,
      })
      .withBody(createdDriver)
      .build();
  }

  @Get()
  public async findAll(
    @Query('page') page = 0,
    @Query('limit') limit = 0,
    @Query('name') name: string,
  ): Promise<NestResponse> {
    const response = this.driversService.findAll(page, limit, name);
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

    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver not found',
      });
    }

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
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<NestResponse> {
    const response = await this.driversService.update(cpf, updateDriverDto);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/${response.cpf}`,
      })
      .withBody(response)
      .build();
  }

  @Delete(':cpf')
  public async remove(@Param('cpf') cpf: string) {
    this.driversService.remove(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withBody({ message: 'Driver deleted' })
      .build();
  }

  @Patch('/block/:cpf')
  public async block(@Param('cpf') cpf: string, @Body() blocked: boolean) {
    const driver = this.driversService.block(cpf, blocked);

    return driver;
  }
  /* @Patch('/unblock/:cpf')
  public async unblock(@Param('cpf') cpf: string) {
    const driver = this.driversService.unblock(cpf);

    return driver;
  } */
}
