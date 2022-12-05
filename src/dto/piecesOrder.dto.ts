import { DimensionDto } from './dimension.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyDto } from './property.dto';

export class PiecesOrderDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  dimensions: DimensionDto;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsArray()
  properties: PropertyDto[];

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  comments: string;

}
