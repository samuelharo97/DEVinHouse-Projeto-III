import { ConflictException, Injectable } from '@nestjs/common';
import { CleanCPF } from 'src/utils/clean-cpf';
import { DriversDatabase } from './db/database';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(private database: DriversDatabase, private cpfFix: CleanCPF) {}
  public async create(driver: Driver) {
    driver.cpf = this.cpfFix.cleanCpf(driver.cpf);

    const driverExists = await this.getDriver(driver.cpf);

    if (driverExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'A driver with the same CPF already exists',
      });
    }

    driver.blocked = driver.blocked || false;

    this.database.saveData(driver);

    return driver;
  }

  public async getDriver(cpf: string) {
    const drivers = await this.database.loadData();
    return drivers.find((driver) => driver.cpf == cpf);
  }

  public async findAll() {
    const drivers = await this.database.loadData();
    return drivers;
  }

  public async findOne(cpf: string) {
    const drivers = await this.database.loadData();

    const driver = drivers.find((driver: Driver) => {
      return driver.cpf == cpf;
    });

    return driver;
  }

  update(cpf: string, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${cpf} driver`;
  }

  public async remove(cpf: string) {
    const drivers = await this.database.loadData();

    const updatedList = drivers.filter((driver) => driver.cpf == cpf);

    return;
  }

  public async block(cpf: string) {
    const driver = await this.getDriver(cpf);
    if (!driver) {
      throw new ConflictException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const drivers = await this.database.loadData();

    const updatedDrivers = drivers.map((driver) => {
      if (driver.cpf === cpf) {
        driver.blocked = true;
      }
      return driver;
    });

    this.database.rewriteData(updatedDrivers);

    const updatedDriver = updatedDrivers.filter((driver) => driver.cpf == cpf);

    return updatedDriver;
  }

  public async unblock(cpf: string) {
    const driver = await this.getDriver(cpf);
    if (!driver) {
      throw new ConflictException({
        statusCode: 404,
        message: 'driver not found',
      });
    }

    const drivers = await this.database.loadData();

    const updatedDrivers = drivers.map((driver) => {
      if (driver.cpf === cpf) {
        driver.blocked = false;
      }
      return driver;
    });

    this.database.rewriteData(updatedDrivers);

    const updatedDriver = updatedDrivers.filter((driver) => driver.cpf == cpf);

    return updatedDriver;
  }
}
