import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SaleUnitOrderDto } from './SalesUnitsOrder.dto';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @IsString()
  @IsNotEmpty()
  confNumber: string;

  @IsDateString()
  @IsNotEmpty()
  orderDate: Date;

  @IsString()
  @IsNotEmpty()
  product: string;

  // @IsString()
  // @IsNotEmpty()
  // projectId: string;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsString()
  @IsNotEmpty()
  finish: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => SaleUnitOrderDto)
  saleUnits: SaleUnitOrderDto[];

  @IsString()
  @IsNotEmpty()
  author: string;

}
