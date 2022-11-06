import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreatePassengerDto } from './create-passenger.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BlockPassengerDTO extends PartialType(CreatePassengerDto) {
  @ApiProperty()
  @IsBoolean()
  blocked?: boolean;
}
