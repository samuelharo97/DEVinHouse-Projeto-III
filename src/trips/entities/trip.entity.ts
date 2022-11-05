import { TRIP_STATUS } from './trip.enum';
import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDate,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Address } from './trip-address';
import { Type } from 'class-transformer';

export class Trip {
  @IsNotEmpty()
  @IsUUID(4)
  trip_id?: string;

  @IsNotEmpty()
  passenger_id?: string;

  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Address)
  starting_from?: Address;

  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Address)
  final_destination: Address;

  @IsEnum(TRIP_STATUS)
  @IsNotEmpty()
  trip_status?: TRIP_STATUS;

  @IsNotEmpty()
  @IsDate()
  created_at?: string;

  duration?: string;

  distance?: string;

  price?: string;
}
