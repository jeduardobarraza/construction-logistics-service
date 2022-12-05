import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PieceDto } from './piece.dto';
import { SetDto } from './set.dto';
import { Type } from 'class-transformer';
import { DimensionDto } from './dimension.dto';
export class SaleUnitDto {
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
  @IsNotEmpty()
  group: string;

  @IsString()
  @IsNotEmpty()
  supplyValue: string;

  @IsString()
  @IsNotEmpty()
  installValue: string;

  @ValidateNested()
  @IsObject()
  @Type(() => DimensionDto)
  dimensions: DimensionDto;

  @IsArray()
  @IsNotEmpty()
  @Type(() => SetDto)
  sets: SetDto[];

  @IsArray()
  //@IsNotEmpty()
  @Type(() => PieceDto)
  pieces: PieceDto[];

}
