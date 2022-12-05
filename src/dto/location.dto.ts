import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
} from 'class-validator';

import { Type } from 'class-transformer';
import { SaleUnitLocationDto } from './saleUnitLocation.dto';

export class LocationDto {

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => SaleUnitLocationDto)
  saleUnits: SaleUnitLocationDto[];

}
