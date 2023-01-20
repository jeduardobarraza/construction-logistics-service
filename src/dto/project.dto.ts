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
export class ProjectDto {
  @IsNumber()
  @IsNotEmpty()
  responsibleId: number;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsNumber()
  @IsNotEmpty()
  tlClientId: number;

  @IsString()
  @IsNotEmpty()
  tlClientName: string;

  @IsString()
  @IsNotEmpty()
  tlProjectName: string;

  @IsString()
  @IsNotEmpty()
  tlProjectAddress: string;

  @IsString()
  @IsNotEmpty()
  tlProjectEmails: string;

  @IsArray()
  tlConfirmationNumber: string[];

  @IsString()
  tlProjectId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  articles: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => SaleUnitLocationDto)
  detail: SaleUnitLocationDto[];

}
