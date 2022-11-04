import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsDate,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';
import { Address } from '../entities/trip-address';

export class CreateTripDto {
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => Address)
  starting_from?: Address;

  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Address)
  final_destination: Address;
}
