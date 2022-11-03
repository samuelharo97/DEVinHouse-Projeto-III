import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreatePassengerDto } from './create-passenger.dto';

export class BlockPassengerDTO extends PartialType(CreatePassengerDto) {
  @IsBoolean()
  blocked?: boolean;
}
