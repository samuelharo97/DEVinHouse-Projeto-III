import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';
import { BlockPassengerDTO } from './dto/block-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengerService {
  constructor(private database: Database, private util: Utils) {}

  public async create(passenger: Passenger) {
    passenger.cpf = this.util.cleanCpf(passenger.cpf);
    const cpfIsValid = this.util.validateCPF(passenger.cpf);

    if (!cpfIsValid) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid CPF',
      });
    }

    const passengerExists = await this.getPassenger(passenger.cpf);
    if (passengerExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'A passenger with the same CPF is already registered',
      });
    }

    const ageValidation = this.util.underAgeValidate(
      passenger.birth_date.toString(),
    );

    if (!ageValidation) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'passenger must be over 18 years old',
      });
    }

    passenger.ordered_trips = [];

    const origin = `${passenger.address.street}, ${passenger.address.city}, ${passenger.address.state}`;
    const destination = `${passenger.address.street}, ${passenger.address.city}, ${passenger.address.state}`;
    const data = await this.util.getGoogleData(origin, destination);

    passenger.address.lat = data.routes[0].legs[0].start_location.lat;
    passenger.address.lon = data.routes[0].legs[0].start_location.lng;

    passenger.blocked = passenger.blocked || false;

    this.database.saveData(passenger, this.database.PASSENGERS_FILE);

    return passenger;
  }

  public async getPassenger(cpf: string): Promise<Passenger> {
    const passengers: Passenger[] = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );
    return passengers.find((passenger) => passenger.cpf == cpf);
  }

  public async findAll(
    page: number,
    limit: number,
    name: string,
  ): Promise<Passenger[]> {
    let passenger: Passenger[] = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );

    if (name) {
      passenger = passenger.filter((passenger) =>
        passenger.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
    }

    if (page > 0 || limit > 0) {
      return this.util.paginate(passenger, page, limit);
    }

    return passenger;
  }

  public async findOne(cpf: string): Promise<Passenger> {
    const passenger = await this.getPassenger(cpf);

    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'passenger not found',
      });
    }

    return passenger;
  }

  public async update(
    cpf: string,
    body: UpdatePassengerDto,
  ): Promise<Passenger> {
    const passengerExists: Passenger = await this.getPassenger(cpf);

    if (!passengerExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'passenger not found',
      });
    }

    const passengers = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );

    if (body.address) {
      const origin = `${body.address.street}, ${body.address.city}, ${body.address.state}`;
      const destination = `${body.address.street}, ${body.address.city}, ${body.address.state}`;
      const data = await this.util.getGoogleData(origin, destination);

      body.address.lat = data.routes[0].legs[0].start_location.lat;
      body.address.lon = data.routes[0].legs[0].start_location.lng;
    }

    const updatedPassengers = passengers.map((passenger: Passenger) => {
      if (passenger.cpf === cpf) {
        passenger.name = body.name || passenger.name;
        passenger.birth_date = body.birth_date || passenger.birth_date;
        passenger.blocked = body.blocked || passenger.blocked;
        passenger.address = body.address || passenger.address;
      }
      return passenger;
    });

    await this.database.rewriteData(
      updatedPassengers,
      this.database.PASSENGERS_FILE,
    );

    const updatedPassenger = await this.getPassenger(cpf);

    return updatedPassenger;
  }

  public async remove(cpf: string) {
    const passenger = await this.getPassenger(cpf);

    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'passenger not found',
      });
    }

    const passengers = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );

    const updatedList = passengers.filter((passenger) => passenger.cpf !== cpf);

    this.database.rewriteData(updatedList, this.database.PASSENGERS_FILE);
  }

  public async block(
    cpf: string,
    body: BlockPassengerDTO,
  ): Promise<Passenger[]> {
    const passenger = await this.getPassenger(cpf);

    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'passenger not found',
      });
    }

    const passengers = await this.database.loadData(
      this.database.PASSENGERS_FILE,
    );

    const updatedPassengers = passengers.map((passenger) => {
      if (passenger.cpf === cpf) {
        passenger.blocked = body.blocked;
      }
      return passenger;
    });

    this.database.rewriteData(updatedPassengers, this.database.PASSENGERS_FILE);

    const updatedPassenger = updatedPassengers.filter(
      (passenger) => passenger.cpf == cpf,
    );

    return updatedPassenger;
  }
}
