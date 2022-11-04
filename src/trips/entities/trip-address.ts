import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class Address {
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
}
