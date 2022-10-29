import { TRIP_STATUS } from './trip.enum';
import { IsNotEmpty, IsUUID, IsDate, Matches } from 'class-validator';

export class Trip {
  @IsUUID(4)
  trip_id: string;

  passenger_id: string;

  starting_from: string;

  final_destination: string;

  trip_status: TRIP_STATUS;
}
