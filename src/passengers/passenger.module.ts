import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService, Database, Utils],
})
export class PassengerModule {}
