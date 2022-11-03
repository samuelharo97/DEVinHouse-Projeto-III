import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateDriverDto } from './create-driver.dto';

export class BlockDriverDTO extends PartialType(CreateDriverDto) {
  @IsBoolean()
  blocked?: boolean;
}
