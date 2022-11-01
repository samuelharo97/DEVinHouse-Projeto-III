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
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  public async create(@Body() body: CreateDriverDto) {
    body.blocked = body.blocked || false;
    const createdDriver = await this.driversService.create(body);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/drivers/${createdDriver}`,
      })
      .withBody(createdDriver)
      .build();
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':cpf')
  public async findOne(@Param('cpf') cpf: string) {
    const driver = await this.driversService.findOne(cpf);

    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver not found',
      });
    }

    return driver;
  }

  @Patch(':cpf')
  update(@Param('cpf') cpf: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(cpf, updateDriverDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.driversService.remove(cpf);
  }

  @Patch('/block/:cpf')
  public block(@Param('cpf') cpf: string) {
    const driver = this.driversService.block(cpf);

    return driver;
  }
  @Patch('/unblock/:cpf')
  public unblock(@Param('cpf') cpf: string) {
    const driver = this.driversService.unblock(cpf);

    return driver;
  }
}
