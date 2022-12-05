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
import { SaleUnitLocationDto } from './saleUnitLocation.dto';
import { LocationDto } from './location.dto';

export class RouteDto {

  @IsString()
  @IsNotEmpty()
  routeNumber: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsDateString()
  @IsNotEmpty()
  routeDate: Date;

  @IsArray()
  @IsNotEmpty()
  @Type(() => LocationDto)
  locations: LocationDto[];

}
