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
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { BlockPassengerDTO } from './dto/block-passenger.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengersService: PassengerService) {}

  @ApiOperation({ summary: 'Creates a new Passenger' })
  @Post()
  public async create(
    @Body() passenger: CreatePassengerDto,
  ): Promise<NestResponse> {
    const createdPassenger = await this.passengersService.create(passenger);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/passengers/${createdPassenger.cpf}`,
      })
      .withBody(createdPassenger)
      .build();
  }

  @ApiOperation({
    summary: 'Lists all passengers, with optional pagination and name query',
  })
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

  @ApiOperation({ summary: 'Lists passenger details' })
  @Get(':cpf')
  public async findOne(@Param('cpf') cpf: string): Promise<NestResponse> {
    const passenger = await this.passengersService.findOne(cpf);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/${cpf}`,
      })
      .withBody(passenger)
      .build();
  }

  @ApiOperation({ summary: 'Updates passenger' })
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

  @ApiOperation({ summary: 'Deletes a passenger' })
  @Delete(':cpf')
  public async remove(@Param('cpf') cpf: string): Promise<NestResponse> {
    await this.passengersService.remove(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.ACCEPTED)
      .withHeaders({
        Location: `/passengers/block/${cpf}`,
      })
      .withBody({ message: `passenger deleted` })
      .build();
  }

  @ApiOperation({ summary: 'Changes passenger.blocked to true of false' })
  @Patch('/block/:cpf')
  public async block(
    @Param('cpf') cpf: string,
    @Body() body: BlockPassengerDTO,
  ) {
    if (body.blocked == undefined) {
      throw new BadRequestException();
    }
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
