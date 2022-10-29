import {
  IsNotEmpty,
  IsDate,
  Matches,
  IsDefined,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { CarModel } from './car-model.enum';

export class Driver {
  @IsDefined({
    message: `name can't be null`,
  })
  @MaxLength(50, {
    message: `name can't be longer than 50 characters`,
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'birth date is required',
  })
  @IsDate()
  birth_date: Date;

  @IsNotEmpty({
    message: 'cpf is required',
  })
  @Matches(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/, {
    message: 'has to be a valid cpf',
  })
  cpf: number;

  @IsNotEmpty({
    message: 'car plate is required',
  })
  car_plate: string;

  @IsNotEmpty({
    message: 'car model is required',
  })
  @IsEnum(CarModel, {
    message: `Car has to be one of the following models: 
    * SEDAN 
    * HATCHBACK 
    * SUV 
    * PICKUP 
    * VAN `,
  })
  car_model: CarModel;
}
