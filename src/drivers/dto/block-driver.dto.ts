import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateDriverDto } from './create-driver.dto';
import { ApiProperty } from '@nestjs/swagger';
export class BlockDriverDTO extends PartialType(CreateDriverDto) {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  blocked: boolean;
}
