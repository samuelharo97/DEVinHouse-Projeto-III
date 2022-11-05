import {
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateAddress {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2, {
    message: 'state must be abbreviated, example: SP, MG, RJ',
  })
  @MinLength(2, {
    message: 'state must be abbreviated, example: SP, MG, RJ',
  })
  state: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  street: string;

  @IsOptional()
  lat?: number;

  @IsOptional()
  lgn?: number;
}
