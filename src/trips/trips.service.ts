import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';
import { Trip } from './entities/trip.entity';
import { TRIP_STATUS } from './entities/trip.enum';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TripsService {
  constructor(private database: Database, private util: Utils) {}

  public async getPassenger(cpf: string) {
    const passengers = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );
    return passengers.find((passenger) => passenger.cpf == cpf);
  }

  public async create(trip: Trip, cpf: string): Promise<Trip> {
    const passenger: Passenger = await this.getPassenger(cpf);

    if (!passenger) {
      throw new NotFoundException({
        message: 'passenger not found',
      });
    }

    if (passenger.blocked) {
      throw new UnauthorizedException({
        message: `user ${passenger.name} is currently blocked`,
      });
    }

    trip.passenger_id = passenger.cpf;
    trip.starting_from = trip.starting_from || passenger.address;
    trip.trip_id = uuidv4();
    trip.created_at = `${new Date().toLocaleDateString(
      'pt-BR',
    )}, ${new Date().toLocaleTimeString()}`;
    trip.trip_status = TRIP_STATUS.CREATED;
    const origin = `${trip.starting_from.street}, ${trip.starting_from.city}, ${trip.starting_from.state}`;
    const destination = `${trip.final_destination.street}, ${trip.final_destination.city}, ${trip.final_destination.state}`;
    const data = await this.util.getGoogleData(origin, destination);
    trip.duration = data.routes[0].legs[0].duration.text;
    trip.distance = data.routes[0].legs[0].distance.text;
    trip.value = (parseFloat(trip.distance) * 3).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    this.database.saveData(trip, this.database.TRIPS_FILE);

    return trip;
  }

  public async findAll(): Promise<Trip[]> {
    const trips = await this.database.loadData(this.database.TRIPS_FILE);
    return trips;
  }

  public async findPending() {
    const trips: Trip[] = await this.database.loadData(
      this.database.TRIPS_FILE,
    );
    const pendingTrips = trips.filter(
      (trip: Trip) => trip.trip_status == TRIP_STATUS.CREATED,
    );

    if (pendingTrips.length == 0) {
      throw new NotFoundException({
        message: 'there are currently zero pending trips',
      });
    }

    return pendingTrips;
  }

  public async getNearby(driverCpf: string) {
    const driver = await this.getDriver(driverCpf);

    const trips: Trip[] = await this.database.loadData(
      this.database.TRIPS_FILE,
    );
    const pendingTrips = trips.filter(
      (trip: Trip) => trip.trip_status == TRIP_STATUS.CREATED,
    );

    const nearbyTrips = pendingTrips.filter(
      (trip) => trip.starting_from.city == driver.location.city,
    );
    console.log(nearbyTrips);

    if (nearbyTrips.length == 0) {
      throw new NotFoundException({
        message: 'no nearby trips found',
      });
    }

    return nearbyTrips;
  }

  public async getDriver(cpf: string) {
    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);
    return drivers.find((driver) => driver.cpf == cpf);
  }

  public async getTrip(id: string) {
    const trips = await this.database.loadData(this.database.TRIPS_FILE);
    return trips.find((trip: Trip) => trip.trip_id == id);
  }

  public async findOne(id: string): Promise<Trip> {
    const trip = await this.getTrip(id);

    if (!trip) {
      throw new NotFoundException({ message: 'trip not found' });
    }
    return trip;
  }

  //This action updates a trip by ID
  public async update(id: string, body: Trip): Promise<Trip> {
    const tripExists = await this.getTrip(id);

    if (!tripExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'trip not found',
      });
    }

    const trips = await this.database.loadData(this.database.TRIPS_FILE);

    const updatedTrips = trips.map((trip: Trip) => {
      if (trip.trip_id === id) {
        trip.final_destination =
          body.final_destination || trip.final_destination;
        trip.starting_from = body.starting_from || trip.starting_from;
      }
      return trip;
    });

    await this.database.rewriteData(updatedTrips, this.database.TRIPS_FILE);

    const updatedTrip = await this.getTrip(id);

    return updatedTrip;
  }

  //This action removes a trip by ID
  public async remove(id: string) {
    const trip: Trip = await this.getTrip(id);

    if (!trip) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'trip not found',
      });
    }
    if (trip.trip_status == TRIP_STATUS.ACCEPTED) {
      throw new ConflictException({
        statusCode: 409,
        message: "can't delete a trip in progress",
      });
    }

    const trips = await this.database.loadData(this.database.TRIPS_FILE);

    const updatedList = trips.filter((tip) => tip.trip_id !== id);

    this.database.rewriteData(updatedList, this.database.TRIPS_FILE);
  }
}
