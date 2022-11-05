import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Database } from '../db/database';
import { Utils } from 'src/utils/utils';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DriversController],
  providers: [DriversService, Database, Utils],
})
export class DriversModule {}
