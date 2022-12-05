import { IsNotEmpty, IsNumber } from 'class-validator';

export class DimensionDto {
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  depth: number;

  @IsNumber()
  @IsNotEmpty()
  area: number;
}
