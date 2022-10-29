import {
  IsNotEmpty,
  IsDate,
  Matches,
  IsDefined,
  MaxLength,
  IsEnum,
} from 'class-validator';

interface UserAddress {
  city: string;
  street: string;
  number: number;
}

export class User {
  @MaxLength(50, {
    message: `name can't be longer than 50 characters`,
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  birth_date: Date;

  cpf: number;

  address: UserAddress;
}
