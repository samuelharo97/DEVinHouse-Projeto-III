import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Utils } from 'src/utils/utils';
import { Database } from '../db/database';
import { BlockDriverDTO } from './dto/block-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(private database: Database, private util: Utils) {}
  public async create(driver: Driver) {
    driver.cpf = this.util.cleanCpf(driver.cpf);
    driver.car_plate = this.util.cleanLicensePlates(driver.car_plate);
    const cpfIsValid = this.util.validateCPF(driver.cpf);

    if (!cpfIsValid) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid CPF',
      });
    }

    const driverExists = await this.getDriver(driver.cpf);
    if (driverExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'A driver with the same CPF is already registered',
      });
    }

    const ageValidation = this.util.underAgeValidate(
      driver.birth_date.toString(),
    );

    if (!ageValidation) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Driver must be over 18 years old',
      });
    }

    driver.blocked = driver.blocked || false;

    driver.completed_trips = [];

    const origin = `${driver.location.street}, ${driver.location.city}, ${driver.location.state}`;
    const destination = `${driver.location.street}, ${driver.location.city}, ${driver.location.state}`;
    const data = await this.util.getGoogleData(origin, destination);

    driver.location.lat = data.routes[0].legs[0].start_location.lat;
    driver.location.lgn = data.routes[0].legs[0].start_location.lng;

    this.database.saveData(driver, this.database.DRIVERS_FILE);

    return driver;
  }

  public async getDriver(cpf: string) {
    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);
    return drivers.find((driver) => driver.cpf == cpf);
  }

  public async getPlates(license_plates: string) {
    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);
    return drivers.find((driver) => driver.car_plate == license_plates);
  }

  public async findAll(
    page: number,
    size: number,
    name: string,
  ): Promise<Driver[]> {
    let drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    if (name) {
      drivers = drivers.filter((driver) =>
        driver.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
    }

    if (page > 0 || size > 0) {
      return this.util.paginate(drivers, page, size);
    }

    return drivers;
  }

  public async findOne(cpf: string): Promise<Driver> {
    const driver = await this.getDriver(cpf);

    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver not found',
      });
    }

    return driver;
  }

  public async update(cpf: string, body: UpdateDriverDto): Promise<Driver> {
    const driverExists = await this.getDriver(cpf);

    if (!driverExists) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    const updatedDrivers = drivers.map((driver) => {
      if (driver.cpf === cpf) {
        driver.name = body.name || driver.name;
        driver.birth_date = body.birth_date || driver.birth_date;
        driver.car_plate = body.car_plate || driver.car_plate;
        driver.car_model = body.car_model || driver.car_model;
        driver.blocked = body.blocked || driver.blocked;
      }
      return driver;
    });

    await this.database.rewriteData(updatedDrivers, this.database.DRIVERS_FILE);

    const updatedDriver = await this.getDriver(cpf);

    return updatedDriver;
  }

  public async remove(cpf: string) {
    const driver: Driver = await this.getDriver(cpf);

    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    if (driver.completed_trips.length > 0) {
      throw new ConflictException({
        message: "Can't delete an active driver.",
      });
    }

    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    const updatedList = drivers.filter((driver) => driver.cpf !== cpf);

    this.database.rewriteData(updatedList, this.database.DRIVERS_FILE);
  }

  public async block(cpf: string, body: BlockDriverDTO): Promise<Driver[]> {
    const driver = await this.getDriver(cpf);

    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    const updatedDrivers = drivers.map((driver) => {
      if (driver.cpf === cpf) {
        driver.blocked = body.blocked;
      }
      return driver;
    });

    this.database.rewriteData(updatedDrivers, this.database.DRIVERS_FILE);

    const updatedDriver = updatedDrivers.filter((driver) => driver.cpf == cpf);

    return updatedDriver;
  }

  /* public async unblock(cpf: string) {
    const driver = await this.getDriver(cpf);
    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    const updatedDrivers = drivers.map((driver) => {
      if (driver.cpf === cpf) {
        driver.blocked = false;
      }
      return driver;
    });

    this.database.rewriteData(updatedDrivers, this.database.DRIVERS_FILE);

    const updatedDriver = updatedDrivers.filter((driver) => driver.cpf == cpf);

    return updatedDriver;
  } */
}
