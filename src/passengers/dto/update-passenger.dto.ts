import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreatePassengerDto } from './create-passenger.dto';

export class UpdatePassengerDto extends PartialType(CreatePassengerDto) {
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
}
