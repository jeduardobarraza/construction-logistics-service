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
import { type } from 'os';
import { PiecesOrderDto } from './piecesOrder.dto';

export class SaleUnitOrderDto {
  [x: string]: any;
  @IsString()
  @IsNotEmpty()
  saleUnitName: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsArray()
  @IsNotEmpty()
  @Type(() => PiecesOrderDto)
  PiecesOrderDto: PiecesOrderDto[];

}
