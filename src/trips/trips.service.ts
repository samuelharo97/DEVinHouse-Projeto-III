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
import { Driver } from 'src/drivers/entities/driver.entity';

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
    const tripPassenger: Passenger = await this.getPassenger(cpf);

    if (!tripPassenger) {
      throw new NotFoundException({
        message: 'passenger not found',
      });
    }

    if (tripPassenger.blocked) {
      throw new UnauthorizedException({
        message: `user ${tripPassenger.name} is currently blocked`,
      });
    }

    if (trip.starting_from) {
      const origin = `${trip.starting_from.street}, ${trip.starting_from.city}, ${trip.starting_from.state}`;
      const destination = `${trip.starting_from.street}, ${trip.starting_from.city}, ${trip.starting_from.state}`;
      const data = await this.util.getGoogleData(origin, destination);

      trip.starting_from.lat = data.routes[0].legs[0].start_location.lat;
      trip.starting_from.lon = data.routes[0].legs[0].start_location.lng;
    }

    trip.passenger_id = tripPassenger.cpf;
    trip.starting_from = trip.starting_from || tripPassenger.address;
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
    trip.price = (parseFloat(trip.distance) * 3).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const passengers = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );

    //adds trip_id to passenger's ordered_trip array
    const updatedPassengers = passengers.map((passenger: Passenger) => {
      if (passenger.cpf === tripPassenger.cpf) {
        passenger.ordered_trips.push(trip.trip_id);
      }
      return passenger;
    });

    this.database.rewriteData(updatedPassengers, this.database.PASSENGERS_FILE);

    this.database.saveData(trip, this.database.TRIPS_FILE);

    return trip;
  }

  public async findAll(): Promise<Trip[]> {
    const trips = await this.database.loadData(this.database.TRIPS_FILE);
    return trips;
  }

  public async findPending(): Promise<Trip[]> {
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

  public async getNearby(driverCpf: string): Promise<Trip[]> {
    const driver = await this.getDriver(driverCpf);

    const nearbyTrips = [];

    const trips: Trip[] = await this.database.loadData(
      this.database.TRIPS_FILE,
    );
    const pendingTrips = trips.filter(
      (trip: Trip) => trip.trip_status == TRIP_STATUS.CREATED,
    );

    pendingTrips.map((trip) => {
      const distanceInKm = this.util.getDistanceFromLatLonInKm(
        trip.starting_from.lat,
        trip.starting_from.lon,
        driver.location.lat,
        driver.location.lon,
      );
      if (distanceInKm < 15) {
        nearbyTrips.push(trip);
      }
      console.log(
        `Distance from ${driver.name} is = ${distanceInKm.toFixed(2)} km`,
      );
    });

    if (nearbyTrips.length == 0) {
      throw new NotFoundException({
        message: 'no nearby trips found',
      });
    }

    return nearbyTrips;
  }

  public async getDriver(cpf: string): Promise<Driver> {
    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);
    return drivers.find((driver) => driver.cpf == cpf);
  }

  public async getTrip(id: string): Promise<Trip> {
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
