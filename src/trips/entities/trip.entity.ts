import { TRIP_STATUS } from './trip.enum';
import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

export class Trip {
  @IsNotEmpty()
  @IsUUID(4)
  trip_id: string;

  @IsNotEmpty()
  passenger_id: string;

  @IsNotEmpty()
  starting_from: string;

  @IsNotEmpty()
  final_destination: string;

  @IsEnum(TRIP_STATUS)
  @IsNotEmpty()
  trip_status: TRIP_STATUS;
}
