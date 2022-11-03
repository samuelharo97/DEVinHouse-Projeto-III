import {
  IsNotEmpty,
  Matches,
  MaxLength,
  IsObject,
  MinLength,
  IsString,
  IsNumber,
  Length,
} from 'class-validator';

export class address {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  street: string;

  @IsNotEmpty()
  @IsNumber()
  number: string;
}
