import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Address } from '../entities/trip-address';

export class DriverLocationDto {
  @ApiProperty({
    description:
      'OPTIONAL, if undefined, the default driver location will be used instead',
    example: `{
      "state": "RJ",
      "city": "Rio de Janeiro",
      "street": "Copacabana"
    }`,
  })
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @IsOptional()
  @Type(() => Address)
  location: Address;
}
