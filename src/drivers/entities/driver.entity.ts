import {
  IsNotEmpty,
  Matches,
  IsDefined,
  MaxLength,
  IsEnum,
  MinLength,
  IsDateString,
} from 'class-validator';
import { Trip } from 'src/trips/entities/trip.entity';
import { CarModel } from './car-model.enum';
import { Address } from './driver-address';

export class Driver {
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

  @IsNotEmpty({
    message: 'car plate is required',
  })
  @Matches(/^(?=(?:.*[0-9]){3})(?=(?:.*[A-Z]){4})[A-Z0-9]{7}$/, {
    message: `must be a valid car plate with no hyphens (-) , such as: MZW4550, MYF8104, IAO4372, ADC9313`,
  })
  car_plate: string;

  @IsNotEmpty({
    message: 'car model is required',
  })
  @IsEnum(CarModel, {
    message: `Car has to be one of the following models: SEDAN, HATCHBACK, SUV, PICKUP, VAN `,
  })
  car_model: CarModel;

  location: Address;

  blocked?: boolean;

  completed_trips?: Trip[];
}
