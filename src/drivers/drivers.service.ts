import { Injectable } from '@nestjs/common';
import { DriversDatabase } from './db/database';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private database: DriversDatabase) {}
  public async create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  public async findAll() {
    const drivers = await this.database.loadData();
    return drivers;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
