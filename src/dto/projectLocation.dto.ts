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
import { LocationDto } from './location.dto';
export class ProjectLocationDto {

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => LocationDto)
  detail: LocationDto[];

}
