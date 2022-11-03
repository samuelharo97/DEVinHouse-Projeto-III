import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePassengerDto } from './create-passenger.dto';

export class UpdatePassengerDto extends PartialType(CreatePassengerDto) {
  @IsNotEmpty()
  @IsEmpty({
    message: `cpf cannot be changed`,
  })
  cpf?: string;

  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
}
