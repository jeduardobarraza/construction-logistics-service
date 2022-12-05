import { DimensionDto } from './dimension.dto';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyDto } from './property.dto';

export class PieceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @ValidateNested()
  @IsObject()
  // @IsNotEmpty() VALIDAR PARA COMPONENTE QUE SEA OPCIONAl
  @Type(() => DimensionDto)
  dimensions: DimensionDto;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  tags: string;

  @IsArray()
  properties: PropertyDto[];

}
