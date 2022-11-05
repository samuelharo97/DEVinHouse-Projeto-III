import { IsNotEmpty, MaxLength, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2, {
    message: 'state must be abbreviated, example: SP, MG, RJ',
  })
  @MinLength(2)
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  street: string;

  lat?: number;

  lon?: number;
}
