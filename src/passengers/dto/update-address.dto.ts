import {
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddress {
  @ApiProperty()
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

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  city: string;

  @ApiProperty()
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
