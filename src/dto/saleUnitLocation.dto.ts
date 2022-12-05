import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';
import { PieceDto } from './piece.dto';
import { SetDto } from './set.dto';
import { Type } from 'class-transformer';
import { SaleUnitDto } from './saleUnit.dto';
export class SaleUnitLocationDto {

  @IsArray()
  @IsNotEmpty()
  @Type(() => SaleUnitDto)
  saleUnit: SaleUnitDto;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

}
