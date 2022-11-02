import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriversDatabase } from './db/database';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [DriversController],
  providers: [DriversService, DriversDatabase, Utils],
})
export class DriversModule {}
