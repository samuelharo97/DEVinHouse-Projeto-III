import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';
import { Address } from '../entities/trip-address';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => Address)
  starting_from?: Address;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Address)
  final_destination: Address;
}
