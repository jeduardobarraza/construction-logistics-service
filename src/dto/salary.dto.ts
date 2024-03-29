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
import { type } from 'os';
import { contactInformationDto } from './contactInformation.dto';
import { Salary } from '../entities/salary.entity';

export class SalaryDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDateString()
  @IsNotEmpty()
  period: Date;

  @IsString()
  @IsNotEmpty()
  salary: string;


}
