import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [TripsController],
  providers: [TripsService, Database, Utils],
})
export class TripsModule {}
