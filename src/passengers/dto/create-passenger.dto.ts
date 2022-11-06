import {
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../entities/passenger-address';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassengerDto {
  @ApiProperty()
  @MaxLength(50, {
    message: `name can't be longer than 50 characters`,
  })
  @MinLength(4, {
    message: `name needs to have a minimum of 4 characters`,
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'birth date is required',
  })
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'cpf is required',
  })
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, {
    message: 'has to be a valid cpf',
  })
  cpf: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Address)
  address: Address;
}
