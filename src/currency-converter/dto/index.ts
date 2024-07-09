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