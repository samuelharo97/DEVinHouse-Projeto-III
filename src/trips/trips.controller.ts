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
import { Trip } from './entities/trip.entity';

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
  public async findPending() {
    return await this.tripsService.findPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateTripDto: Trip,
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
  public async remove(@Param('id') id: string) {
    return this.tripsService.remove(id);
  }
}
