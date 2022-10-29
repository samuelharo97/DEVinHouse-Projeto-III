import { ClassSerializerInterceptor, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [UsersModule, DriversModule, TripsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
