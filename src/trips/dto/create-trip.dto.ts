import { IsNotEmpty, IsUUID, IsEnum, IsDate } from 'class-validator';
import { TRIP_STATUS } from '../entities/trip.enum';

export class CreateTripDto {
  @IsNotEmpty()
  @IsUUID(4)
  trip_id?: string;

  @IsNotEmpty()
  passenger_id: string;

  @IsNotEmpty()
  starting_from: string;

  @IsNotEmpty()
  final_destination: string;

  @IsEnum(TRIP_STATUS)
  @IsNotEmpty()
  trip_status?: TRIP_STATUS;

  @IsNotEmpty()
  @IsDate()
  created_at?: string;
}
