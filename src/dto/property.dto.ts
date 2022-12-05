import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PropertyDto {
  @IsString()
  @IsNotEmpty()
  property: string;

  @IsString()
  @IsNotEmpty()
  value: string;

}
