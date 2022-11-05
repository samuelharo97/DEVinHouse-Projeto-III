import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTripDto } from './dto/update-trip.dto';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('new/:cpf')
  public async create(
    @Param('cpf') passengerCPF: string,
    @Body() createTripDto: CreateTripDto,
  ): Promise<NestResponse> {
    const newTrip = await this.tripsService.create(createTripDto, passengerCPF);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/trips/${newTrip.trip_id}`,
      })
      .withBody({ newTrip })
      .build();
  }

  @Get('nearby/:cpf')
  public async findNearby(@Param('cpf') cpf: string): Promise<NestResponse> {
    const nearbyTrips = await this.tripsService.getNearby(cpf);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips/${cpf}`,
      })
      .withBody(nearbyTrips)
      .build();
  }

  @Get()
  public async findAll(): Promise<NestResponse> {
    const allTrips = this.tripsService.findAll();
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips`,
      })
      .withBody(allTrips)
      .build();
  }

  @Get('pending')
  public async findPending(): Promise<NestResponse> {
    const pending = await this.tripsService.findPending();
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips/pending`,
      })
      .withBody(pending)
      .build();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<NestResponse> {
    const response = await this.tripsService.findOne(id);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips/${id}`,
      })
      .withBody(response)
      .build();
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<NestResponse> {
    const updatedTrip = await this.tripsService.update(id, updateTripDto);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips/${updatedTrip.trip_id}`,
      })
      .withBody(updatedTrip)
      .build();
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<NestResponse> {
    await this.tripsService.remove(id);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips/${id}`,
      })
      .withBody({ message: `trip deleted` })
      .build();
  }
}
