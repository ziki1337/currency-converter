import { Module } from '@nestjs/common';
import { CurrencyConverterController } from './currency-converter.controller';
import { CurrencyConverterService } from './currency-converter.service';

@Module({
  controllers: [CurrencyConverterController],
  providers: [CurrencyConverterService]
})
export class CurrencyConverterModule {}
