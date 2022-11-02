import {
  IsNotEmpty,
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
  @Matches(
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    { message: 'birth_date must have dd/mm/yyyy format' },
  )
  birth_date: string;

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
