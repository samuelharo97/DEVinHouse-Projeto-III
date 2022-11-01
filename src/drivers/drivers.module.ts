import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriversDatabase } from './db/database';
import { CleanCPF } from 'src/utils/clean-cpf';

@Module({
  controllers: [DriversController],
  providers: [DriversService, DriversDatabase, CleanCPF],
})
export class DriversModule {}
