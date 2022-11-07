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
import { UpdateTripDto } from './dto/update-trip.dto';
import { DriverLocationDto } from './dto/driver-location.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @ApiOperation({ summary: 'Creates new trip' })
  @Post('new/:passengerCPF')
  public async create(
    @Param('passengerCPF') passengerCPF: string,
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

  @ApiOperation({
    summary: 'Lists trips nearby driver',
    description:
      "If post body has driver.location, this route will list trips 15km around the location's coordinates, but, this request can also be made with NO BODY, then, driver.location will be taken from the drivers default location (the location registered when driver was created).",
  })
  @Post('nearby/:driverCPF')
  public async findNearby(
    @Param('driverCPF') cpf: string,
    @Body() DriverLocationDTO: DriverLocationDto,
  ): Promise<NestResponse> {
    const nearbyTrips = await this.tripsService.getNearby(
      cpf,
      DriverLocationDTO,
    );

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/trips/${cpf}`,
      })
      .withBody(nearbyTrips)
      .build();
  }

  @ApiOperation({ summary: 'Lists all trips' })
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

  @ApiOperation({
    summary: 'Lists all trips with status = created',
  })
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

  @ApiOperation({ summary: 'Lists trip details' })
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

  @ApiOperation({ summary: 'Updates a trip' })
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

  @ApiOperation({ summary: 'Deletes a trip' })
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
