import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CarModel } from '../entities/car-model.enum';
import { Address } from '../entities/driver-address';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty()
  @IsDefined({
    message: `name can't be null`,
  })
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

  @ApiProperty({
    description: 'ISO 8601',
    example: 'yyyy-mm-dd',
  })
  @IsNotEmpty({
    message: 'birth date is required',
  })
  @IsDateString({
    message: 'it will accept format yyyy-mm-dd',
  })
  birth_date: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'cpf is required',
  })
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, {
    message: 'has to be a valid cpf',
  })
  cpf: string;

  @ApiProperty({
    description: 'valid car plate with no hyphens (-)',
    example: 'MZW4550, MYF8104, IAO4372, ADC9313',
  })
  @IsNotEmpty({
    message: 'car plate is required',
  })
  @Matches(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/, {
    message: `must be a valid car plate with no hyphens (-), such as: MZW4550, MYF8104, IAO4372, ADC9313
`,
  })
  car_plate: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'car model is required',
  })
  @IsEnum(CarModel, {
    message: `car model has to be one of the following models: SEDAN, HATCHBACK, SUV, PICKUP, VAN `,
  })
  car_model: CarModel;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsObject({
    message: 'location is an object containing: state, street and city',
  })
  @IsNotEmptyObject()
  @Type(() => Address)
  location: Address;
}
