import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CurrencyConverterService } from './currency-converter.service';
import { ConvertCurrencyDto } from './dto/index';

@Controller('currency-converter')
export class CurrencyConverterController {
    constructor(private readonly currencyConverterService: CurrencyConverterService) {}

    @Post('convert')
    @UsePipes(new ValidationPipe({ transform: true }))
    async convertCurrency(@Body() convertCurrencyDto: ConvertCurrencyDto) {
      const { num, preCurr, postCurr } = convertCurrencyDto;

      const convertedAmount = await this.currencyConverterService.findAllValues(num, preCurr, postCurr);
  
      return { fromCurrency: preCurr, toCurrency: postCurr, amount: num, convertedAmount };
    }
  
    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async returnValue(@Query() convertCurrencyDto: ConvertCurrencyDto) {
      const { num, preCurr, postCurr } = convertCurrencyDto;

      const convertedAmount = await this.currencyConverterService.findAllValues(num, preCurr, postCurr);
  
      return convertedAmount;
    }
}
