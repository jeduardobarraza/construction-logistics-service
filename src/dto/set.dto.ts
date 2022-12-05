import { PieceDto } from './piece.dto';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionDto } from './dimension.dto';

export class SetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  tags: string;

  @ValidateNested()
  @IsObject()
  @Type(() => DimensionDto)
  dimensions: DimensionDto;

  @IsArray()
  //@IsNotEmpty()
  @Type(() => SetDto)
  sets: SetDto[];

  @IsArray()
  @IsNotEmpty()
  @Type(() => PieceDto)
  pieces: PieceDto[];
}
