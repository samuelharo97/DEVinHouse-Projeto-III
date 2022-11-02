import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Database, Utils],
})
export class UsersModule {}
