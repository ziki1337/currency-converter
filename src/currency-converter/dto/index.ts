import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ConvertCurrencyDto {
  @IsNumber()
  @Type(() => Number)
  num: number;

  @IsString()
  preCurr: string;

  @IsString()
  postCurr: string;
}

export class ConvertCalcDTO {
  @IsNumber()
  @Type(() => Number)
  num1: number;

  @IsString()
  firstCurr: string;

  @IsNumber()
  @Type(() => Number)
  num2: number;

  @IsString()
  secondCurr: string;

  @IsString()
  finalCurr: string;

  @IsString()
  operation: string;
}