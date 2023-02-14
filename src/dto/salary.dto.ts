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

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  salary: string;


}
