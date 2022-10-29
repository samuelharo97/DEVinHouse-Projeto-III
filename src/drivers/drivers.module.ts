import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriversDatabase } from './db/database';

@Module({
  controllers: [DriversController],
  providers: [DriversService, DriversDatabase],
})
export class DriversModule {}
