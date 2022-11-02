import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { Utils } from 'src/utils/utils';
import { Database } from '../db/database';
import { BlockDriverDTo } from './dto/block-driver.dto';
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

    console.log(cpfIsValid);

    const driverExists = await this.getDriver(driver.cpf);
    const plateExists = await this.getPlates(driver.car_plate);
    if (driverExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'A driver with the same CPF is already registered',
      });
    }

    if (plateExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'A car with the same license plate is already registered',
      });
    }

    const ageValidation = this.util.underAgeValidate(driver.birth_date);

    if (!ageValidation) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Driver must be over 18 years old',
      });
    }

    driver.blocked = driver.blocked || false;

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
    limit: number,
    name: string,
  ): Promise<Driver[]> {
    let drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    if (name) {
      drivers = drivers.filter((driver) =>
        driver.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
    }

    if (page > 0 || limit > 0) {
      return this.util.paginate(drivers, page, limit);
    }

    return drivers;
  }

  public async findOne(cpf: string): Promise<Driver> {
    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    const driver = drivers.find((driver: Driver) => {
      return driver.cpf == cpf;
    });

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

  public async remove(cpf: string): Promise<NestResponse> {
    const driver = await this.getDriver(cpf);
    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const drivers = await this.database.loadData(this.database.DRIVERS_FILE);

    const updatedList = drivers.filter((driver) => driver.cpf !== cpf);

    this.database.rewriteData(updatedList, this.database.DRIVERS_FILE);

    return;
  }

  public async block(cpf: string, received: boolean) {
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
        driver.blocked = received;
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
