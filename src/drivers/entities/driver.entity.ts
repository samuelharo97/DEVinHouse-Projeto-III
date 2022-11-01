import {
  IsNotEmpty,
  IsDate,
  Matches,
  IsDefined,
  MaxLength,
  IsEnum,
  IsBoolean,
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
  @IsDate({
    message: 'birth date must be dd/mm/yyyy or dd-mm-yyyy format',
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
    message: `must be a valid car plate, such as: 
  * AB123CD, 
  * 1A2B3CD, 
  * 123ABCD, 
  * ABCD123
  `,
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

  @IsBoolean({ message: 'blocked must be true or false' })
  blocked?: boolean;
}
