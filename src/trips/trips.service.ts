import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { v4 as uuidv4 } from 'uuid';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';
import { Trip } from './entities/trip.entity';
import { TRIP_STATUS } from './entities/trip.enum';
import { Passenger } from 'src/passengers/entities/passenger.entity';

@Injectable()
export class TripsService {
  constructor(private database: Database, private util: Utils) {}

  public async getPassenger(cpf: string) {
    const passengers = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );
    return passengers.find((passenger) => passenger.cpf == cpf);
  }

  public async create(trip: Trip, cpf: string) {
    const passenger: Passenger = await this.getPassenger(cpf);

    if (!passenger) {
      throw new NotFoundException({
        message: 'passenger not found',
      });
    }

    trip.passenger_id = passenger.cpf;
    trip.trip_id = uuidv4();
    trip.created_at = new Date().toLocaleDateString('pt-BR');
    trip.trip_status = TRIP_STATUS.CREATED;

    return trip;
  }

  findAll() {
    return `This action returns all trips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
