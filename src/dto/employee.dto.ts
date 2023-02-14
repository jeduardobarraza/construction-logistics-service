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
import { contactInformationDto } from './contactInformation.dto';
import { Salary } from '../entities/salary.entity';

export class EmployeeDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  secondLastName: string;

  @IsString()
  @IsNotEmpty()
  dniType: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsDateString()
  @IsNotEmpty()
  initialDate: Date;

  @IsDateString()
  finalDate: Date;

  @IsNotEmpty()
  @Type(()=>contactInformationDto)
  contactInformation: contactInformationDto;

  @IsArray()
  @IsNotEmpty()
  salary:Salary[];

}
