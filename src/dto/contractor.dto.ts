import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ContractorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  nit: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsArray()
  team: string[];

  @IsString()
  @IsNotEmpty()
  area: string;

}
