import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateDriverDto } from './create-driver.dto';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @IsNotEmpty()
  @IsEmpty({
    message: `cpf cannot be changed`,
  })
  cpf?: string;

  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
}
