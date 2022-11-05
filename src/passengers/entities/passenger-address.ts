import { IsNotEmpty, MaxLength, IsString, MinLength } from 'class-validator';

export class Address {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2, {
    message: 'state must be abbreviated, example: SP, MG, RJ',
  })
  @MinLength(2)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  street: string;

  lat?: number;

  lon?: number;
}
