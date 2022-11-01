import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength,
} from 'class-validator';
import { CarModel } from '../entities/car-model.enum';

export class CreateDriverDto {
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
  @Matches(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/, {
    message: `must be a valid car plate, such as: AB123CD, 1A2B3CD, 123ABCD, ABCD123
`,
  })
  car_plate: string;

  @IsNotEmpty({
    message: 'car model is required',
  })
  @IsEnum(CarModel, {
    message: `car model has to be one of the following models: SEDAN, HATCHBACK, SUV, PICKUP, VAN `,
  })
  car_model: CarModel;

  blocked?: boolean;
}
