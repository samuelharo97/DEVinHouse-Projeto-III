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
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { BlockPassengerDTO } from './dto/block-passenger.dto';

@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengersService: PassengerService) {}

  @Post()
  public async create(@Body() passenger: CreatePassengerDto) {
    const createdPassenger = await this.passengersService.create(passenger);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/passengers/${createdPassenger.cpf}`,
      })
      .withBody(createdPassenger)
      .build();
  }

  @Get()
  public async findAll(
    @Query('page') page = 0,
    @Query('limit') limit = 0,
    @Query('name') name: string,
  ): Promise<NestResponse> {
    const passengers = this.passengersService.findAll(page, limit, name);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers`,
      })
      .withBody(passengers)
      .build();
  }

  @Get(':cpf')
  public async findOne(@Param('cpf') cpf: string) {
    const passenger = await this.passengersService.findOne(cpf);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/${cpf}`,
      })
      .withBody(passenger)
      .build();
  }

  @Put(':cpf')
  public async update(
    @Param('cpf') cpf: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<NestResponse> {
    const passenger = await this.passengersService.update(
      cpf,
      updatePassengerDto,
    );
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/${passenger.cpf}`,
      })
      .withBody(passenger)
      .build();
  }

  @Delete(':cpf')
  public async remove(@Param('cpf') cpf: string): Promise<NestResponse> {
    await this.passengersService.remove(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.NO_CONTENT)
      .withHeaders({
        Location: `/passengers/block/${cpf}`,
      })
      .withBody({ message: `passenger deleted` })
      .build();
  }

  @Patch('/block/:cpf')
  public async block(
    @Param('cpf') cpf: string,
    @Body() body: BlockPassengerDTO,
  ) {
    const passenger = await this.passengersService.block(cpf, body);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/block/${cpf}`,
      })
      .withBody(passenger)
      .build();
  }
}
