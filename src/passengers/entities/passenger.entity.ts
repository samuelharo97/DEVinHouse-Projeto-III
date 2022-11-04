import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Matches,
  MaxLength,
  IsObject,
  MinLength,
  ValidateNested,
  IsNotEmptyObject,
  IsDateString,
} from 'class-validator';
import { Address } from './passenger-address';

export class Passenger {
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

  @IsNotEmpty({
    message: 'birth date is required',
  })
  @IsDateString({
    message: 'it will accept format yyyy-mm-dd',
  })
  birth_date: Date;

  @IsNotEmpty({
    message: 'cpf is required',
  })
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, {
    message: 'has to be a valid cpf',
  })
  cpf: string;

  @ValidateNested({ each: true })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Address)
  address: Address;

  blocked?: boolean;
}
